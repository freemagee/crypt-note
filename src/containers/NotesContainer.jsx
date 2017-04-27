import React from 'react';
import ReactDOM from 'react-dom';

import Helpers from '../helpers/Helpers.js';
import NotesList from '../components/NotesList.jsx';
import RenderedNote from '../components/RenderedNote.jsx';

const NOTES = [
  {
    title: 'Zen and the art of motorcycle maintenance',
    source: './notes/zen.md',
    created: 1491004800,
    updated: 1492770458
  },
  {
    title: 'React JS',
    source: './notes/react.md',
    created: 1491004800,
    updated: 1492770458
  }
];

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: '',
      editMode: false,
      index: null
    };
  }
  setCurrentNote(currentNote, index) {
    this.setState({currentNote, index});
  }
  setEditMode(editMode) {
    this.setState({editMode});
  }
  saveNote(val) {
    let currentNote = val;
    let changedTimestamp = Helpers.generateTimestamp();
    //To Do: Actually save to file
    this.setState(
      {
        currentNote: currentNote,
        editMode: true
      }
    );
    NOTES[this.state.index].updated = changedTimestamp;
  }
  render() {
    return (
      <div className='NotesContainer'>
        <div className='NotesContainer__inner'>
          <NotesList notes={NOTES} setCurrentNote={this.setCurrentNote.bind(this)} />
          <RenderedNote source={this.state.currentNote} mode={this.state.editMode} setEditMode={this.setEditMode.bind(this)} saveNote={this.saveNote.bind(this)} />
        </div>
      </div>
    );
  }
}