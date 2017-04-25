import React from 'react';
import ReactDOM from 'react-dom';

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
      currentNote: 'No note selected',
      editMode: false
    };
  }
  render() {
    return (
      <div className='NotesContainer'>
        <div className='NotesContainer__inner'>
          <h1>Notes</h1>
          <NotesList notes={NOTES} setCurrentNote={this.setCurrentNote.bind(this)} />
          <RenderedNote source={this.state.currentNote} mode={this.state.editMode} setEditMode={this.setEditMode.bind(this)} />
        </div>
      </div>
    );
  }
  setCurrentNote(currentNote) {
    this.setState({currentNote});
  }
  setEditMode(editMode) {
    this.setState({editMode});
  }
}