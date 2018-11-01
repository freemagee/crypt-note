import React from "react";

import MarkdownIt from "markdown-it";
import Parser from "html-react-parser";

const md = new MarkdownIt();

export default class RenderedNote extends React.Component {
  render() {
    const content =
      typeof this.props.content !== "undefined"
        ? md.render(this.props.content)
        : "";
    const title =
      typeof this.props.title !== "undefined" ? this.props.title : "";

    return (
      <div className="MarkdownNote" data-edit-mode={this.props.mode}>
        <div className="MarkdownNote__meta">
          <p className="MarkdownNote__title">{title}</p>
        </div>
        <div className="MarkdownNote__content">{Parser(content)}</div>
      </div>
    );
  }
}
