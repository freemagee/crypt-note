import React from "react";
// TODO: load data dynamically from a db. Just here as a data placeholder
import NOTES from "../data.js";
import NoteActions from "../components/NoteActions.jsx";
import NotesList from "../components/NotesList.jsx";
import Note from "../components/Note.jsx";
import CreateNote from "../components/CreateNote.jsx";
//import EditNote from "../components/EditNote.jsx";
import Helpers from "../helpers/Helpers.js";

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: {},
      editMode: false,
      createMode: false,
      index: null,
      appMode: "list"
    };
  }
  setAppMode(appMode) {
    this.setState({ appMode });
  }
  returnToList() {
    this.setState({
      currentNote: {},
      editMode: false,
      createMode: false,
      index: null,
      appMode: "list"
    });
  }
  setCurrentNote(noteContent, index) {
    const completeNote = Object.assign({}, NOTES[index]);
    completeNote.content = noteContent;

    this.setState({
      currentNote: completeNote,
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
  updateNote(noteObj) {
    debugger;
    // let currentNote = val;
    // let changedTimestamp = Helpers.generateTimestamp();
    // this.setState({
    //   currentNote: currentNote,
    //   editMode: true
    // });
    // NOTES[this.state.index].updated = changedTimestamp;
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
          <NoteActions
            appMode={this.state.appMode}
            createMode={this.state.createMode}
            editMode={this.state.editMode}
            returnToList={this.returnToList.bind(this)}
            setEditMode={this.setEditMode.bind(this)}
          />
          <CreateNote
            mode={this.state.createMode}
            appMode={this.state.appMode}
            setCreateMode={this.setCreateMode.bind(this)}
            createNewNote={this.createNewNote.bind(this)}
            saveNewNote={this.saveNewNote.bind(this)}
          />
          <NotesList
            notes={NOTES}
            appMode={this.state.appMode}
            setCurrentNote={this.setCurrentNote.bind(this)}
          />
          <Note
            mode={this.state.editMode}
            appMode={this.state.appMode}
            note={this.state.currentNote}
          />
        </div>
      </div>
    );
  }
}
