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

    if (this.props.notes !== nextProps.notes) {
      return true;
    }

    return false;
  }
  render() {
    const notesCount = this.props.notes.length;

    if (this.props.appMode === "list") {
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
        </div>
      );
    } else if (this.props.appMode === "list" && notesCount === 0) {
      return <p>Currently no notes available</p>;
    } else {
      return <div className="Notes isHidden" />;
    }
  }
}
