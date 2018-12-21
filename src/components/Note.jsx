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

    if (this.props.appMode === "note" || this.props.appMode === "preview") {
      return (
        <div className="Note">
          <RenderedNote title={title} content={content} />
        </div>
      );
    } else {
      return <div className="Note isHidden" />;
    }
  }
}
