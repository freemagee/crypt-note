import React from "react";

import RenderedNote from "./RenderedNote.jsx";

export default class Note extends React.Component {
  render() {
    const title =
      typeof this.props.note.title !== "undefined" ? this.props.note.title : "";
    const content =
      typeof this.props.note.content !== "undefined"
        ? this.props.note.content
        : "";

    return (
      <div
        className="Note"
        data-app-mode={this.props.appMode}
        data-edit-mode={this.props.mode}
      >
        {!this.props.mode &&
          this.props.appMode === "note" && (
            <RenderedNote title={title} content={content} />
          )}
      </div>
    );
  }
}
