import React from 'react';
import ReactDOM from 'react-dom';

// TO DO: load data dynamically from a db
import NOTES from '../data.js';

import Helpers from '../helpers/Helpers.js';
import NotesList from '../components/NotesList.jsx';
import RenderedNote from '../components/RenderedNote.jsx';

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: '',
      editMode: false,
      index: null,
      appMode: 'list'
    };
  }
  setAppMode(appMode) {
    this.setState({appMode});
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
  saveNote(val) {
    let currentNote = val;
    let changedTimestamp = Helpers.generateTimestamp();
    //To Do: Actually save to file
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
          <RenderedNote source={this.state.currentNote} returnToList={this.setAppMode.bind(this)} appMode={this.state.appMode} mode={this.state.editMode} setEditMode={this.setEditMode.bind(this)} saveNote={this.saveNote.bind(this)} />
        </div>
      </div>
    );
  }
}