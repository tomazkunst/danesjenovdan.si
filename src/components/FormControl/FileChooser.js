import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { uniqueId } from 'lodash';
import { autobind } from 'core-decorators';
import Button from './Button';

class FileChooser extends React.Component {
  componentWillMount() {
    const id = uniqueId('filechooser-');
    this.setState({ id });
  }

  @autobind
  onClick() {
    if (this.input) {
      this.input.click();
    }
  }

  @autobind
  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const classes = classnames(
      'component__filechooser',
      { 'component__filechooser--inline': this.props.inline },
    );
    return (
      <div className={classes}>
        <input style={{ display: 'none' }} type="file" onChange={this.handleChange} ref={(input) => { this.input = input; }} />
        <Button value={this.props.value} onClickFunc={this.onClick} />
      </div>
    );
  }
}

FileChooser.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  inline: PropTypes.bool,
};

export default FileChooser;