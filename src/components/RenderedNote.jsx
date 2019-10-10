import React from "react";

import { Remarkable } from "remarkable";
import Parser from "html-react-parser";

export default class RenderedNote extends React.PureComponent {
  render() {
    const md = new Remarkable();
    const mdContent = md.render(this.props.content);

    return (
      <div className="RenderedNote">
        <div className="RenderedNote__meta">
          <p className="RenderedNote__title">{this.props.title}</p>
        </div>
        <div className="Markdown">{Parser(mdContent)}</div>
      </div>
    );
  }
}
