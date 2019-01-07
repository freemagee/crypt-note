import React from "react";

import Remarkable from "remarkable";
import Parser from "html-react-parser";

export default class RenderedNote extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.content !== nextProps.content) {
      return true;
    }

    return false;
  }
  render() {
    const md = new Remarkable();
    const content =
      typeof this.props.content !== "undefined"
        ? md.render(this.props.content)
        : "";
    const title =
      typeof this.props.title !== "undefined" ? this.props.title : "";

    return (
      <div className="RenderedNote" data-edit-mode={this.props.mode}>
        <div className="RenderedNote__meta">
          <p className="RenderedNote__title">{title}</p>
        </div>
        {/*<div
          className="Markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />*/}
        <div className="Markdown">{Parser(content)}</div>
      </div>
    );
  }
}
