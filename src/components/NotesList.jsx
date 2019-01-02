import React from "react";

import NoteItem from "./NoteItem.jsx";

export default class NotesList extends React.Component {
  setCurrentNote(id, index) {
    this.props.setCurrentNote(id, index);
  }
  onDeleteNote(id, title) {
    this.props.onDeleteNote(id, title);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.appMode !== nextProps.appMode) {
      return true;
    }

    if (this.props.notes.length !== nextProps.notes.length) {
      return true;
    }

    return false;
  }
  render() {
    if (this.props.appMode === "list") {
      const notesCount = this.props.notes.length;

      return (
        <div className="Notes">
          {notesCount !== 0 && (
            <ul className="Notes__list">
              {this.props.notes.map(function(note, index) {
                return (
                  <NoteItem
                    note={note}
                    openNote={this.setCurrentNote.bind(this)}
                    deleteNote={this.onDeleteNote.bind(this)}
                    index={index}
                    key={note.guid}
                  />
                );
              }, this)}
            </ul>
          )}
          {notesCount === 0 && <p>Currently no notes available</p>}
        </div>
      );
    } else {
      return <div className="Notes isHidden" />;
    }
  }
}
