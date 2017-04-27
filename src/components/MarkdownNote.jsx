import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownIt from 'markdown-it';
import Parser from 'html-react-parser';

const md = new MarkdownIt();

export default class MarkdownNote extends React.Component {
  render() {
    let result = md.render(this.props.content);

    return (
      <div className='Note__markdown'>
        {Parser(result)}
      </div>
    );
  }
}