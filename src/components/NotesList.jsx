import React from "react";

import NoteItem from "./NoteItem.jsx";

export default class NotesList extends React.Component {
  setCurrentNote(source, index) {
    this.props.setCurrentNote(source, index);
  }
  render() {
    return (
      <div className="Notes" data-app-mode={this.props.appMode}>
        <ul className="Notes__list">
          {this.props.notes.map(function(note, index) {
            return (
              <NoteItem
                note={note}
                openNote={this.setCurrentNote.bind(this)}
                index={index}
                key={index}
              />
            );
          }, this)}
        </ul>
      </div>
    );
  }
}
