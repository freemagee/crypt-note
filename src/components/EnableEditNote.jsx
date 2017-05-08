import React from 'react';
import ReactDOM from 'react-dom';

export default class EnableEditNote extends React.Component {
  editNote() {
    this.props.editNote(true);
  }
  render() {
    let classVisible = '';

    if (this.props.content === '') {
      classVisible = 'btn btn-primary Note__edit u-hide';
    } else {
      classVisible = 'btn btn-primary Note__edit';
    }

    return (
      <button className={classVisible} onClick={this.editNote.bind(this)}>Edit</button>
    );
  }
}