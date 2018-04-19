import React from 'react';
import ReactDOM from 'react-dom';

import NoteCreateEditor from '../components/NoteCreateEditor.jsx';

export default class EditNote extends React.Component {
  setCreateMode() {
    this.props.setCreateMode(true);
    this.props.createNewNote();
  }
  cancelCreateMode() {
    this.props.setCreateMode(false);
    this.props.returnToList('list');
  }
  render() {
    return (
      <div className='NoteCreate' data-app-mode={this.props.appMode}>
        <button className='btn NoteCreate__create' onClick={this.setCreateMode.bind(this)} data-create-mode={this.props.mode}>Create new note</button>
        <NoteCreateEditor mode={this.props.mode} cancelCreateMode={this.cancelCreateMode.bind(this)} />
      </div>
    );
  }
}