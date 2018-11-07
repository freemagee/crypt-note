import React from "react";

import NoteItem from "./NoteItem.jsx";

export default class NotesList extends React.Component {
  setCurrentNote(content, index) {
    this.props.setCurrentNote(content, index);
  }
  render() {
    return (
      <div className="Notes" data-app-mode={this.props.appMode}>
        {this.props.appMode === "list" && (
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
      </div>
    );
  }
}
