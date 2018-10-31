import React from "react";

// TODO: load data dynamically from a db
import NOTES from "../data.js";

import Helpers from "../helpers/Helpers.js";
import NotesList from "../components/NotesList.jsx";
import RenderedNote from "../components/RenderedNote.jsx";
import CreateNote from "../components/CreateNote.jsx";

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: "",
      currentNoteTitle: "",
      editMode: false,
      createMode: false,
      index: null,
      appMode: "list"
    };
  }
  setAppMode(appMode) {
    this.setState({ appMode });
  }
  setCurrentNote(currentNote, index) {
    this.setState({
      currentNote: currentNote,
      currentNoteTitle: NOTES[index].title,
      index: index
    });
    this.setAppMode("note");
  }
  setEditMode(editMode) {
    this.setState({ editMode });
  }
  setCreateMode(createMode) {
    this.setState({ createMode });
  }
  createNewNote() {
    this.setAppMode("create");
  }
  saveNote(val) {
    let currentNote = val;
    let changedTimestamp = Helpers.generateTimestamp();
    this.setState({
      currentNote: currentNote,
      editMode: true
    });
    NOTES[this.state.index].updated = changedTimestamp;
  }
  saveNewNote(noteObj) {
    noteObj.created = Helpers.generateTimestamp();
    noteObj.updated = Helpers.generateTimestamp();
    console.log("Saving a new note...not really", noteObj);
  }
  render() {
    return (
      <div className="NotesContainer">
        <div className="NotesContainer__inner">
          <CreateNote
            mode={this.state.createMode}
            appMode={this.state.appMode}
            returnToList={this.setAppMode.bind(this)}
            setCreateMode={this.setCreateMode.bind(this)}
            createNewNote={this.createNewNote.bind(this)}
            saveNewNote={this.saveNewNote.bind(this)}
          />
          <NotesList
            notes={NOTES}
            appMode={this.state.appMode}
            setCurrentNote={this.setCurrentNote.bind(this)}
          />
          <RenderedNote
            mode={this.state.editMode}
            appMode={this.state.appMode}
            title={this.state.currentNoteTitle}
            source={this.state.currentNote}
            returnToList={this.setAppMode.bind(this)}
            setEditMode={this.setEditMode.bind(this)}
            saveNote={this.saveNote.bind(this)}
          />
        </div>
      </div>
    );
  }
}
