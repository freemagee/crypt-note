import React from "react";

import Remarkable from "remarkable";
import Parser from "html-react-parser";

export default class RenderedNote extends React.PureComponent {
  render() {
    const md = new Remarkable();
    const content =
      typeof this.props.content !== "undefined"
        ? md.render(this.props.content)
        : "";
    const title =
      typeof this.props.title !== "undefined" ? this.props.title : "";

    if (title === "" && content === "") {
      return (
        <div className="RenderedNote">
          <p>No Note Content</p>
        </div>
      );
    } else {
      return (
        <div className="RenderedNote">
          <div className="RenderedNote__meta">
            <p className="RenderedNote__title">{title}</p>
          </div>
          <div className="Markdown">{Parser(content)}</div>
        </div>
      );
    }
  }
}
