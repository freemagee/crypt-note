import React from "react";

import convertTimestamp from "../helpers/convertTimestamp";

export default class NoteItem extends React.PureComponent {
  openNote() {
    this.props.openNote(this.props.note.guid, this.props.index);
  }
  deleteNote() {
    this.props.deleteNote(this.props.note.guid, this.props.note.title);
  }
  render() {
    const created = convertTimestamp(this.props.note.created);
    const updated = convertTimestamp(this.props.note.updated);

    return (
      <li className="NoteItem">
        <p className="NoteItem__title">{this.props.note.title}</p>
        <div className="NoteItem__meta">
          <p className="NoteItem__description">
            <span className="NoteItem__label">Created</span>
            {created}
          </p>
          <p className="NoteItem__description">
            <span className="NoteItem__label">Last updated</span>
            {updated}
          </p>
        </div>
        <div className="NoteItem__actions">
          <button
            type="button"
            className="NoteItem__open"
            onClick={this.openNote.bind(this)}
          >
            Open
          </button>
          <button
            type="button"
            className="NoteItem__delete"
            onClick={this.deleteNote.bind(this)}
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}
