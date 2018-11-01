import React from "react";

import RenderedNote from "./RenderedNote.jsx";

export default class Note extends React.Component {
  returnToList() {
    this.props.returnToList("list");
  }
  // setEditMode(mode) {
  //   this.props.setEditMode(mode);
  // }
  render() {
    return (
      <div
        className="Note"
        data-app-mode={this.props.appMode}
        data-edit-mode={this.props.mode}
      >
        <div className="MarkdownNote__actions">
          <button
            type="button"
            className="MarkdownNote__return"
            onClick={this.returnToList.bind(this)}
          >
            Return to list
          </button>

        </div>
        <RenderedNote
          title={this.props.note.title}
          content={this.props.note.content}
        />
      </div>
    );
  }
}
