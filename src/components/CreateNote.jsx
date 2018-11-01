import React from "react";

import NoteCreateEditor from "../components/NoteCreateEditor.jsx";

export default class EditNote extends React.Component {
  setCreateMode() {
    this.props.setCreateMode(true);
    this.props.createNewNote();
  }
  cancelCreateMode() {
    this.props.setCreateMode(false);
    this.props.returnToList("list");
  }
  saveNewNote(obj) {
    this.props.saveNewNote(obj);
  }
  render() {
    return (
      <div className="NoteCreate" data-app-mode={this.props.appMode}>
        <NoteCreateEditor
          mode={this.props.mode}
          cancelCreateMode={this.cancelCreateMode.bind(this)}
          saveNewNote={this.saveNewNote.bind(this)}
        />
      </div>
    );
  }
}
