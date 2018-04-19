import React from 'react';
import ReactDOM from 'react-dom';

export default class NoteCreateEditor extends React.Component {
  handleSubmit(event) {
    console.log('Save new note');
    event.preventDefault();
  }
  cancelCreate() {
    this.props.cancelCreateMode();
  }
  render() {
    return (
      <div className='NoteCreateEditor' data-create-mode={this.props.mode}>
        <form className='NoteCreateEditor__form' onSubmit={this.handleSubmit}>
          <button className='btn NoteCreate__cancel' type='button' onClick={this.cancelCreate.bind(this)}>Cancel and return to list</button>
          <button className='btn btn-primary NoteCreateEditor__save' type='submit'>Save new note</button>
          <textarea className='NoteCreateEditor__editor' defaultValue='Type your new note here'></textarea>
        </form>
      </div>
    );
  }
}