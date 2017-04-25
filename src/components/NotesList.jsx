import React from 'react';
import ReactDOM from 'react-dom';

import NoteItem from './NoteItem.jsx';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className='NotesList'>
        { this.props.notes.map(function(note, index) {
          return <NoteItem note={note} openNote={this.setCurrentNote.bind(this)} index={index} key={index} />
        }, this) }
      </ul>
    );
  }
  setCurrentNote(source) {
    this.props.setCurrentNote(source);
  }
}