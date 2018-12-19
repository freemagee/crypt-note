import React from "react";

import NoteItem from "./NoteItem.jsx";

export default class NotesList extends React.Component {
  setCurrentNote(content, index) {
    this.props.setCurrentNote(content, index);
  }
  render() {
    const notesCount = this.props.notes.length;

    return (
      <div className="Notes" data-app-mode={this.props.appMode}>
        {this.props.appMode === "list" && notesCount !== 0 && (
          <ul className="Notes__list">
            {this.props.notes.map(function(note, index) {
              return (
                <NoteItem
                  note={note}
                  openNote={this.setCurrentNote.bind(this)}
                  index={index}
                  key={note.title}
                />
              );
            }, this)}
          </ul>
        )}
        {this.props.appMode === "list" && notesCount === 0 && (
          <p>Currently no notes available</p>
        )}
      </div>
    );
  }
}
