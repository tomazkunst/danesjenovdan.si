import { browserHistory } from 'react-router';
import * as dash from './utils/dash';

function initReactions(store) {
  store.on('user:fetch', () => {
    if (store.get().user.isLoading) {
      return;
    }

    store.get().user.set({ isLoading: true });

    dash.getUser()
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().user.set({
            isLoading: false,
            data: null,
          });
          browserHistory.replace('/login');
        } else {
          store.get().user.set({
            isLoading: false,
            data: res.body.user,
          });
        }
      });
  });

  store.on('pinned:fetch', () => {
    if (store.get().pinned.isLoading) {
      return;
    }

    store.get().pinned.set({ isLoading: true });

    dash.getPinned()
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().pinned.set({
            isLoading: false,
          });
        } else {
          store.get().pinned.set({
            isLoading: false,
            data: res.body.pinned,
          });
        }
      });
  });

  store.on('pinned:remove', (id) => {
    const msg = store.get().pinned.data.find(e => e.id === id);

    if (msg) {
      msg.set({ disabled: true });

      dash.removePinned(id)
        .end((err, res) => {
          if (err || !res.ok) {
            // noop
          } else {
            store.trigger('pinned:fetch');
          }
        });
    }
  });

  store.on('pinned:add', () => {
    store.get().pinned.newMessage.set({ isLoading: true });

    dash.addPinned(store.get().pinned.newMessage.message)
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().pinned.newMessage.set({
            isLoading: false,
            error: true,
          });
        } else {
          store.get().pinned.newMessage.set({
            showInput: false,
            message: '',
            isLoading: false,
            error: false,
          });
          store.trigger('pinned:fetch');
        }
      });
  });

  store.on('pinned:showinput', () => {
    store.get().pinned.newMessage.set({ showInput: true });
  });

  store.on('pinned:resetinput', () => {
    store.get().pinned.newMessage.set({
      showInput: true,
      message: '',
      isLoading: false,
      error: false,
    });
  });

  store.on('pinned:updatemessage', (value) => {
    store.get().pinned.newMessage.set({ message: value }).now();
  });

  store.on('users:fetch', () => {
    if (store.get().users.isLoading) {
      return;
    }

    store.get().users.set({ isLoading: true });

    dash.getUsers()
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().users.set({
            isLoading: false,
          });
        } else {
          store.get().users.set({
            isLoading: false,
            data: res.body.users,
          });
          if (res.body.users.length) {
            store.get().newArticle.set({
              selectedUser: res.body.users[0].id,
            });
          }
        }
      });
  });

  store.on('newsubmission:changeuser', (id) => {
    store.get().newArticle.set({ selectedUser: id });
  });

  store.on('newsubmission:create', () => {
    if (store.get().newArticle.isLoading) {
      return;
    }

    store.get().newArticle.set({ isLoading: true });

    dash.addSubmission(store.get().newArticle.selectedUser)
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().newArticle.set({
            isLoading: false,
            error: true,
          });
        } else {
          store.get().newArticle.set({
            isLoading: false,
            error: false,
          });
          store.trigger('submissions:fetch');
          store.trigger('pending:fetch');
        }
      });
  });

  store.on('submissions:fetch', () => {
    if (store.get().submissions.isLoading) {
      return;
    }

    store.get().submissions.set({ isLoading: true });

    dash.getSubmissions()
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().submissions.set({
            isLoading: false,
          });
        } else {
          store.get().submissions.set({
            isLoading: false,
            data: res.body.submissions,
          });
        }
      });
  });

  store.on('submissions:remove', (id) => {
    const sub = store.get().submissions.data.find(e => e.id === id);
    const type = sub.type;

    if (sub) {
      sub.set({ disabled: true });

      dash.removeSubmission(id)
        .end((err, res) => {
          if (err || !res.ok) {
            // noop
          } else {
            store.trigger('submissions:fetch');
            store.trigger(`${type}:fetch`);
          }
        });
    }
  });

  store.on('pending:fetch', () => {
    if (store.get().pending.isLoading) {
      return;
    }

    store.get().pending.set({ isLoading: true });

    dash.getPending()
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().pending.set({
            isLoading: false,
          });
        } else {
          store.get().pending.set({
            isLoading: false,
            data: res.body.pending,
          });
        }
      });
  });

  store.on('votable:fetch', () => {
    if (store.get().votable.isLoading) {
      return;
    }

    store.get().votable.set({ isLoading: true });

    dash.getVotable()
      .end((err, res) => {
        if (err || !res.ok) {
          store.get().votable.set({
            isLoading: false,
          });
        } else {
          store.get().votable.set({
            isLoading: false,
            data: res.body.votable,
          });
        }
      });
  });

  store.on('editor:showeditor', (id) => {
    const sub = store.get().pending.data.find(e => e.id === id);

    if (sub) {
      store.get().set({ currentEditor: sub.toJS() });
    }
  });

  store.on('editor:discardeditor', () => {
    store.get().set({ currentEditor: null });
  });

  store.on('pending:edit', (id) => {
    const sub = store.get().pending.data.find(e => e.id === id);
    const editor = store.get().currentEditor;

    if (sub && editor && editor.id === id) {
      sub.set({ disabled: true });

      dash.editSubmission(id, editor)
        .end((err, res) => {
          if (err || !res.ok) {
            // noop
          } else {
            store.trigger('editor:discardeditor');
            store.trigger('pending:fetch');
            if (store.get().submissions.data) {
              store.trigger('submissions:fetch');
            }
          }
        });
    }
  });

  store.on('pending:submit', (id) => {
    const sub = store.get().pending.data.find(e => e.id === id);

    if (sub) {
      sub.set({ disabled: true });

      dash.submitPending(id)
        .end((err, res) => {
          if (err || !res.ok) {
            // noop
          } else {
            store.trigger('pending:fetch');
            store.trigger('votable:fetch');
            if (store.get().submissions.data) {
              store.trigger('submissions:fetch');
            }
          }
        });
    }
  });

  store.on('votable:edit', (id, data) => {
    const sub = store.get().votable.data.find(e => e.id === id);

    if (sub) {
      sub.set({ disabled: true });

      dash.editSubmission(id, data)
        .end((err, res) => {
          if (err || !res.ok) {
            // noop
          } else {
            store.trigger('votable:fetch');
            if (store.get().submissions.data) {
              store.trigger('submissions:fetch');
            }
          }
        });
    }
  });

  store.on('votable:publish', (id) => {
    const sub = store.get().votable.data.find(e => e.id === id);

    if (sub) {
      sub.set({ disabled: true });

      dash.publishVotable(id)
        .end((err, res) => {
          if (err || !res.ok) {
            // noop
          } else {
            store.trigger('votable:fetch');
            if (store.get().submissions.data) {
              store.trigger('submissions:fetch');
            }
          }
        });
    }
  });
}

export default initReactions;
