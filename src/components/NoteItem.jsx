import React from 'react';
import ReactDOM from 'react-dom';

import Helpers from '../helpers/Helpers.js';

export default class NoteItem extends React.Component {
  render() {
    var createdDate = Helpers.convertTimestamp(this.props.note.created);

    return (
      <li className='NoteList__NoteItem'>
        <p>{this.props.note.title} {createdDate}</p>
        <button className='btn btn--open' onClick={this.openNote.bind(this)}>Open</button>
      </li>
    );
  }
  openNote() {
    var headers = new Headers();
    var thisObj = this;

    headers.append('Content-Type', 'text/markdown');

    fetch(this.props.note.source, {
      method: 'get'
    }).then(function(response) {
      return response.text();
    }).then(function(markdown) {
      thisObj.props.openNote(markdown);
    });
  }
}