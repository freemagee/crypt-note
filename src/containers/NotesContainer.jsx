import React from "react";
import ReactDOM from "react-dom";

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
      notes: NOTES,
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
    const currentNoteTitle = this.state.notes[index].title;
    this.setState({
      currentNote,
      currentNoteTitle,
      index
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
  saveNote(newNoteObj) {
    const {content, title} = newNoteObj;
    let changedTimestamp = Helpers.generateTimestamp();
    const notesClone = [...this.state.notes];
    notesClone[this.state.index] = {
      ...notesClone[this.state.index],
      title,
      updated: changedTimestamp
    };
    this.setState({
      currentNote: content,
      currentNoteTitle: title,
      editMode: false,
      notes: notesClone
    });
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
            notes={this.state.notes}
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
