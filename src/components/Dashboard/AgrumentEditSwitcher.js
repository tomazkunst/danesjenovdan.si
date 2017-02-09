import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import Button from '../FormControl/Button';
import AgrumentVotePreview from './AgrumentVotePreview';
import AgrumentEditor from './AgrumentEditor';

class EditSwitcher extends React.Component {
  constructor() {
    super();

    this.state = {
      editor: false,
    };
  }

  @autobind
  switchToPreview() {
    this.editor.save((err, res) => {
      if (err || !res.body) {
        console.log(err);
      } else {
        this.setState({ editor: false });
        this.props.onEditorShowChange(false);
      }
    });
  }

  @autobind
  switchToEditor() {
    this.setState({ editor: true });
    this.props.onEditorShowChange(true);
  }

  render() {
    if (this.state.editor) {
      return (
        <div className="component__edit-switcher">
          <AgrumentEditor data={this.props.data} ref={(e) => { this.editor = e; }} />
          <Button block value="Shrani" onClickFunc={this.switchToPreview} />
        </div>
      );
    }
    return (
      <div className="component__edit-switcher">
        <AgrumentVotePreview data={this.props.data} />
        <Button block value="Uredi" onClickFunc={this.switchToEditor} />
      </div>
    );
  }
}

EditSwitcher.propTypes = {
  data: PropTypes.shape().isRequired,
  onEditorShowChange: PropTypes.func,
};

EditSwitcher.defaultProps = {
  onEditorShowChange: _.noop,
};

export default EditSwitcher;