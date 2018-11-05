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
      newNote: {},
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
      newNote: {},
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

    this.setState(
      {
        currentNote: completeNote,
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

      this.setState({ currentNote: resetNote });
    }
  }
  setCreateMode(createMode) {
    this.setState({ createMode });
    this.setAppMode("create");
  }
  updateTitle(title) {
    const currentNote = Object.assign({}, this.state.currentNote);

    currentNote.title = title;
    this.setState({ currentNote });
  }
  updateContent(content) {
    const currentNote = Object.assign({}, this.state.currentNote);

    currentNote.content = content;
    this.setState({ currentNote });
  }
  updateCurrentNote() {
    const currentNote = Object.assign({}, this.state.currentNote);

    currentNote.updated = Helpers.generateTimestamp();
    this.setState({ currentNote, editMode: true }, () => {
      NOTES[this.state.index] = currentNote;
      console.log("Updating current note...not really", this.state.currentNote);
    });
  }
  setNewTitle(newTitle) {
    const newNote = Object.assign({}, this.state.newNote);

    newNote.title = newTitle;
    this.setState({ newNote });
  }
  setNewContent(newContent) {
    const newNote = Object.assign({}, this.state.newNote);

    newNote.content = newContent;
    this.setState({ newNote });
  }
  saveNewNote() {
    const newNote = Object.assign({}, this.state.newNote);

    newNote.created = Helpers.generateTimestamp();
    newNote.updated = Helpers.generateTimestamp();
    this.setState({ newNote }, () => {
      console.log("Saving a new note...not really", this.state.newNote);
    });
  }
  render() {
    const currentNote = this.state.currentNote;

    return (
      <div className="NotesContainer">
        <div className="NotesContainer__inner">
          <NoteActions
            appMode={this.state.appMode}
            createMode={this.state.createMode}
            editMode={this.state.editMode}
            returnToList={this.returnToList.bind(this)}
            saveNewNote={this.saveNewNote.bind(this)}
            setEditMode={this.setEditMode.bind(this)}
            setCreateMode={this.setCreateMode.bind(this)}
            onUpdateNote={this.updateCurrentNote.bind(this)}
          />
          <CreateNote
            createMode={this.state.createMode}
            appMode={this.state.appMode}
            onTitleChange={this.setNewTitle.bind(this)}
            onContentChange={this.setNewContent.bind(this)}
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
          <EditNote
            key={this.state.index}
            mode={this.state.editMode}
            appMode={this.state.appMode}
            note={currentNote}
            onTitleUpdate={this.updateTitle.bind(this)}
            onContentUpdate={this.updateContent.bind(this)}
          />
        </div>
      </div>
    );
  }
}
