import React from "react";
import ReactDOM from "react-dom";

import Helpers from "../helpers/Helpers.js";

export default class NoteItem extends React.Component {
  openNote() {
    var headers = new Headers();
    var thisObj = this;

    headers.append("Content-Type", "text/markdown");

    fetch(this.props.note.source, {
      method: "get"
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(markdown) {
        thisObj.props.openNote(markdown, thisObj.props.index);
      });
  }
  render() {
    let created = Helpers.convertTimestamp(this.props.note.created);
    let updated = Helpers.convertTimestamp(this.props.note.updated);

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
        <button className="NoteItem__open" onClick={this.openNote.bind(this)}>
          Open
        </button>
      </li>
    );
  }
}
