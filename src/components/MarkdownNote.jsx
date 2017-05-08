import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownIt from 'markdown-it';
import Parser from 'html-react-parser';

import EnableEditNote from './EnableEditNote.jsx';

const md = new MarkdownIt();

export default class MarkdownNote extends React.Component {
  editMode(mode) {
    this.props.editMode(mode);
  }
  returnToList() {
    this.props.returnToList('list');
  }
  render() {
    let result = md.render(this.props.content);

    return (
      <div className='Note__markdown' data-edit-mode={this.props.mode}>
        <button type='button' className='btn' onClick={this.returnToList.bind(this)}>Return to list</button>
        <EnableEditNote content={this.props.content} editNote={this.editMode.bind(this)} />
        <div className='Markdown'>
          {Parser(result)}
        </div>
      </div>
    );
  }
}