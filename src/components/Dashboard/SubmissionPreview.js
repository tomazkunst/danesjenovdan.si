import React, { PropTypes } from 'react';
import { toSloDateString } from '../../utils/date';
import TimeAgo from '../LocalizedTimeAgo';

const SubmissionPreview = ({ entry }) => (
  <article className="component__submission-preview">
    <section className="row clearfix">
      <div className="col-sm-6">
        <div>
          <strong>Deadline: </strong>
          <span>
            {toSloDateString(entry.deadline)} (<TimeAgo date={entry.deadline} />)
          </span>
        </div>
      </div>
      <div className="col-sm-6">
        <div>
          <strong>Objava: </strong>
          <span>
            {toSloDateString(entry.date)} (<TimeAgo date={entry.date} />)
          </span>
        </div>
      </div>
      <div className="col-sm-6">
        <div>
          <strong>Avtor: </strong>
          <span>
            {entry.author_name || `Neznan avtor #${entry.author}`}
          </span>
        </div>
      </div>
      <div className="col-sm-6">
        <div>
          <strong>Pravice: </strong>
          <span>
            {entry.rights}
          </span>
        </div>
      </div>
    </section>
    <hr />
    <section>
      {entry.hasEmbed
        ? <div className="embed-responsive" style={{ paddingBottom: entry.embedHeight || '56.25%' }} dangerouslySetInnerHTML={{ __html: entry.embedCode }} />
        : <img src={entry.imageURL} className="img-responsive img-fullwidth" alt="og cover" />
      }
      <h3>{entry.title}</h3>
      <div className="agrument__text" dangerouslySetInnerHTML={{ __html: entry.content }} />
    </section>
    <hr />
    <section>
      <div>
        <strong>og description: </strong>
        {entry.description}
      </div>
      <div>
        <strong>og image: </strong>
        <img src={entry.imageURL} className="img-responsive img-thumbnail img-fullwidth" style={{ width: '50%' }} alt="og cover" />
      </div>
      <div>
        <strong>caption: </strong>
        {entry.imageCaption}
      </div>
    </section>
  </article>
);

SubmissionPreview.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    author: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    imageCaption: PropTypes.string.isRequired,
    hasEmbed: PropTypes.number.isRequired,
    embedCode: PropTypes.string,
    embedHeight: PropTypes.string,
    deadline: PropTypes.number.isRequired,
    rights: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    author_name: PropTypes.string,
  }).isRequired,
};

export default SubmissionPreview;