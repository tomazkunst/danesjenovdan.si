/**
 * This component wraps react-rte and does nothing when required on server-side to prevent crashing
 * by accesing the 'window' property.
 */

import React from 'react';
import RichTextEditor from 'react-rte';
import { autobind } from 'core-decorators';

/* eslint-disable no-underscore-dangle, react/prop-types */
class SimpleRichTextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      editorValue: RichTextEditor.createEmptyValue(),
    };
  }

  componentWillMount() {
    this._updateStateFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this._updateStateFromProps(newProps);
  }

  @autobind
  _updateStateFromProps(newProps) {
    const { value, format } = newProps;
    if (this._currentValue != null) {
      const [currentValue, currentFormat] = this._currentValue;
      if (format === currentFormat && value === currentValue) {
        return;
      }
    }
    const { editorValue } = this.state;
    this.setState({
      editorValue: editorValue.setContentFromString(value, format),
    });
    this._currentValue = [format, value];
  }

  @autobind
  _onChange(editorValue) {
    const { format, onChange } = this.props;
    const oldEditorValue = this.state.editorValue;
    this.setState({ editorValue });
    const oldContentState = oldEditorValue ? oldEditorValue.getEditorState().getCurrentContent() : null;
    const newContentState = editorValue.getEditorState().getCurrentContent();
    if (oldContentState !== newContentState) {
      const stringValue = editorValue.toString(format);
      // Optimization so if we receive new props we don't need
      // to parse anything unnecessarily.
      this._currentValue = [format, stringValue];
      if (onChange && stringValue !== this.props.value) {
        onChange(stringValue);
      }
    }
  }

  render() {
    const { value, format, onChange } = this.props; // eslint-disable-line no-unused-vars
    return (
      <RichTextEditor
        value={this.state.editorValue}
        onChange={this._onChange}
      />
    );
  }
}

export default SimpleRichTextEditor;