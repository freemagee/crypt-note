import React from 'react';
import ReactDOM from 'react-dom';

// TODO: load data dynamically from a db
import NOTES from '../data.js';

import Helpers from '../helpers/Helpers.js';
import NotesList from '../components/NotesList.jsx';
import RenderedNote from '../components/RenderedNote.jsx';
import CreateNote from '../components/CreateNote.jsx';

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: '',
      editMode: false,
      createMode: false,
      index: null,
      appMode: 'list'
    };
  }
  setAppMode(appMode) {
    this.setState({appMode});
    console.log(`App mode set to: ${appMode}`);
  }
  setCurrentNote(currentNote, index) {
    this.setState({
      currentNote: currentNote,
      index: index
    });
    this.setAppMode('note');
  }
  setEditMode(editMode) {
    this.setState({editMode});
  }
  setCreateMode(createMode) {
    this.setState({createMode});
  }
  createNewNote() {
    this.setAppMode('create');
  }
  saveNote(val) {
    let currentNote = val;
    let changedTimestamp = Helpers.generateTimestamp();
    // TODO: Actually save to file/back to source
    this.setState({
        currentNote: currentNote,
        editMode: true
    });
    NOTES[this.state.index].updated = changedTimestamp;
  }
  render() {
    return (
      <div className='NotesContainer'>
        <div className='NotesContainer__inner'>
          <NotesList notes={NOTES} appMode={this.state.appMode} setCurrentNote={this.setCurrentNote.bind(this)} />
          <RenderedNote mode={this.state.editMode} appMode={this.state.appMode} source={this.state.currentNote} returnToList={this.setAppMode.bind(this)} setEditMode={this.setEditMode.bind(this)} saveNote={this.saveNote.bind(this)} />
          <CreateNote mode={this.state.createMode} appMode={this.state.appMode} returnToList={this.setAppMode.bind(this)} setCreateMode={this.setCreateMode.bind(this)} createNewNote={this.createNewNote.bind(this)} />
        </div>
      </div>
    );
  }
}