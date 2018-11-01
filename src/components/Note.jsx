import React from "react";

import RenderedNote from "./RenderedNote.jsx";

export default class Note extends React.Component {
  render() {
    return (
      <div
        className="Note"
        data-app-mode={this.props.appMode}
        data-edit-mode={this.props.mode}
      >
        <RenderedNote
          title={this.props.note.title}
          content={this.props.note.content}
        />
      </div>
    );
  }
}
