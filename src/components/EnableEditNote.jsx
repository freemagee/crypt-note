import React from 'react';
import ReactDOM from 'react-dom';

export default class EnableEditNote extends React.Component {
  editNote() {
    this.props.editNote(true);
  }
  render() {
    // let classVisible = '';

    // if (this.props.content === '') {
    //   classVisible = 'MarkdownNote__edit';
    // } else {
    //   classVisible = 'Note__edit';
    // }

    return (
      <button className='MarkdownNote__edit' onClick={this.editNote.bind(this)}>Edit</button>
    );
  }
}