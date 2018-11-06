import React from "react";
// TODO: load data dynamically from a db. Just here as a data placeholder
import NOTES from "../data.js";
import NoteActions from "../components/NoteActions.jsx";
import NotesList from "../components/NotesList.jsx";
import Note from "../components/Note.jsx";
import CreateNote from "../components/CreateNote.jsx";
import EditNote from "../components/EditNote.jsx";
import Helpers from "../helpers/Helpers.js";

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      editMode: false,
      createMode: false,
      index: null,
      appMode: "list"
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }
  setAppMode(appMode) {
    this.setState({ appMode });
  }
  returnToList() {
    this.setState(this.baseState);
  }
  setCurrentNote(noteContent, index) {
    const completeNote = Object.assign({}, NOTES[index]);
    completeNote.content = noteContent;

    this.setState(
      {
        note: completeNote,
        index: index
      },
      () => {
        NOTES[this.state.index] = completeNote;
        this.setAppMode("note");
      }
    );
  }
  setEditMode(editMode) {
    this.setState({ editMode });
    if (!editMode) {
      const resetNote = Object.assign({}, NOTES[this.state.index]);

      this.setState({ note: resetNote });
    }
  }
  setCreateMode(createMode) {
    this.setState({ createMode });
    this.setAppMode("create");
  }
  setTitle(title) {
    const note = Object.assign({}, this.state.note);

    note.title = title;
    this.updateNoteState(note);
  }
  setContent(content) {
    const note = Object.assign({}, this.state.note);

    note.content = content;
    this.updateNoteState(note);
  }
  saveNote() {
    const note = Object.assign({}, this.state.note);

    if (this.state.createMode) {
      note.created = Helpers.generateTimestamp();
    }
    note.updated = Helpers.generateTimestamp();
    this.setState({ note }, () => {
      console.log("Saving the note...not really", this.state.note);
    });
  }
  updateNoteState(note) {
    this.setState({ note });
  }
  render() {
    const note = this.state.note;

    return (
      <div className="NotesContainer">
        <div className="NotesContainer__inner">
          <NoteActions
            appMode={this.state.appMode}
            createMode={this.state.createMode}
            editMode={this.state.editMode}
            returnToList={this.returnToList.bind(this)}
            saveNewNote={this.saveNote.bind(this)}
            setEditMode={this.setEditMode.bind(this)}
            setCreateMode={this.setCreateMode.bind(this)}
            onUpdateNote={this.saveNote.bind(this)}
          />
          <NotesList
            notes={NOTES}
            appMode={this.state.appMode}
            setCurrentNote={this.setCurrentNote.bind(this)}
          />
          <CreateNote
            createMode={this.state.createMode}
            appMode={this.state.appMode}
            onTitleChange={this.setTitle.bind(this)}
            onContentChange={this.setContent.bind(this)}
          />
          <Note
            mode={this.state.editMode}
            appMode={this.state.appMode}
            note={note}
          />
          <EditNote
            key={this.state.index}
            mode={this.state.editMode}
            appMode={this.state.appMode}
            note={note}
            onTitleUpdate={this.setTitle.bind(this)}
            onContentUpdate={this.setContent.bind(this)}
          />
        </div>
      </div>
    );
  }
}
