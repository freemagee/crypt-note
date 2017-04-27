import React from 'react';
import ReactDOM from 'react-dom';

import EditNote from './EditNote.jsx';
import MarkdownNote from './MarkdownNote.jsx';

export default class RenderedNote extends React.Component {
  editMode(mode) {
    this.props.setEditMode(mode);
  }
  saveNote(val) {
    this.props.saveNote(val);
  }
  render() {
    return (
      <div className='Note' data-edit-mode={this.props.mode}>
        <MarkdownNote content={this.props.source} mode={this.props.mode} editMode={this.editMode.bind(this)} />
        <EditNote content={this.props.source} mode={this.props.mode} saveNote={this.saveNote.bind(this)} />
      </div>
    );
  }
}