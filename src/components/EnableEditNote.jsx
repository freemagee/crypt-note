import React from 'react';
import ReactDOM from 'react-dom';

export default class EnableEditNote extends React.Component {
  render() {
    return (
      <button className='btn Note__edit' onClick={this.editNote.bind(this)}>Edit</button>
    );
  }
  editNote() {
    this.props.editNote(true);
  }
}