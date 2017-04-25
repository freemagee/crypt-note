import React from 'react';
import ReactDOM from 'react-dom';

import EditNote from './EditNote.jsx';
import MarkdownNote from './MarkdownNote.jsx';
import EnableEditNote from './EnableEditNote.jsx';

export default class RenderedNote extends React.Component {
  setEditMode() {
    this.props.setEditMode(true);
  }
  saveNote(val) {
    this.props.saveNote(val);
  }
  render() {
    return (
      <div className='Note' data-edit-mode={this.props.mode}>
        <EnableEditNote editNote={this.setEditMode.bind(this)} />
        <MarkdownNote content={this.props.source} />
        <EditNote content={this.props.source} saveNote={this.saveNote.bind(this)} />
      </div>
    );
  }
}