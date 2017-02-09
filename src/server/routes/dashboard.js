import express from 'express';
import _ from 'lodash';
import { requireLoggedIn, requireAdmin } from '../middleware/auth';
import db from '../database';

const router = express.Router();

// Require that the user is logged in for all requests on this router.
router.use(requireLoggedIn);

router.get('/user', (req, res) => {
  res.json(req.user);
});

router.get('/users', requireAdmin, (req, res) => {
  db('users')
    .select('id', 'name', 'group')
    .then((data) => {
      res.json({
        users: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.get('/pending', (req, res) => {
  db('posts')
    .where('type', 'pending')
    .andWhere('author', req.user.id)
    .orderBy('deadline', 'asc')
    .select()
    .then((data) => {
      res.json({
        pending: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post('/pending/edit/:id', (req, res) => {
  // clone req.body and replace some props with undefined so they are ignored by db.update and we
  // can't for example change the id or author by mistake
  const data = _.assign({}, req.body, {
    id: undefined,
    author: undefined,
    deadline: undefined,
    type: undefined,
    date: undefined,
  });

  db('posts')
    .whereIn('type', ['votable', 'pending'])
    .andWhere('id', req.params.id)
    .update(data)
    .then(() => {
      res.json({
        success: 'Edited submission!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post('/pending/add', (req, res) => {
  db('posts')
    .insert({
      date: Date.now(),
      author: req.body.author,
      title: '',
      content: '',
      description: '',
      imageURL: '',
      imageCaption: '',
      hasEmbed: 0,
      deadline: Date.now(),
      rights: '',
      type: 'pending',
    })
    .then(() => {
      res.json({
        success: 'Added submission!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post('/pending/submit/:id', (req, res) => {
  db('posts')
    .where('type', 'pending')
    .andWhere('author', req.user.id)
    .andWhere('id', req.params.id)
    .update({
      type: 'votable',
    })
    .then(() => {
      res.json({
        success: 'Submitted for vote!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.get('/votable', (req, res) => {
  db('posts')
    .where('type', 'votable')
    .orderBy('deadline', 'asc')
    .select()
    .then((data) => {
      res.json({
        votable: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post('/votable/publish/:id', requireAdmin, (req, res) => {
  db('posts')
    .where('type', 'votable')
    .andWhere('id', req.params.id)
    .update({
      type: 'published',
    })
    .then(() => {
      res.json({
        success: 'Published!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.get('/pinned', (req, res) => {
  db('pinned')
    .orderBy('timestamp', 'desc')
    .leftOuterJoin('users', 'pinned.author', 'users.id')
    .select('pinned.*', 'users.name as author_name')
    .then((data) => {
      res.json({
        pinned: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post('/pinned/add', (req, res) => {
  if (req.body && req.body.message) {
    db('pinned')
      .insert({
        author: req.user.id,
        timestamp: Date.now(),
        message: req.body.message,
      })
      .then(() => {
        res.json({
          success: 'Added pinned message',
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  } else {
    res.status(400).json({
      error: 'Bad Request',
    });
  }
});

router.delete('/pinned/remove/:id', (req, res) => {
  let query;
  if (req.user.group === 'admin') {
    query = db('pinned')
      .where('id', req.params.id)
      .del();
  } else {
    query = db('pinned')
      .where('id', req.params.id)
      .andWhere('author', req.user.id)
      .del();
  }

  query
    .then(() => {
      res.json({
        success: 'Removed pinned message',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

export default router;