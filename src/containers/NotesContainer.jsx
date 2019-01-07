import React from "react";
import API from "../services/Api.js";
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
      actions: ["create"],
      notes: [],
      note: {},
      appMode: "list",
      index: null
    };
  }
  componentDidMount() {
    this.getAllNotes();
  }
  getNote(id) {
    API.getNote(id).then(result => {
      if (result !== null) {
        this.setState({ note: result });
      } else {
        window.alert("Error retrieving note");
      }
    });
  }
  getAllNotes() {
    API.getAllNotes().then(result => {
      if (result !== null) {
        this.setState({ notes: result });
      } else {
        window.alert("Error retrieving notes");
      }
    });
  }
  setAppMode(appMode, actions) {
    switch (appMode) {
      case "list":
        this.returnToList();
        break;
      case "note":
        // Note needs reset to unedited state
        this.setState({
          note: Object.assign({}, this.state.notes[this.state.index]),
          appMode,
          actions
        });
        break;
      default:
        this.setState({ appMode, actions });
    }
  }
  setCurrentNote(id, index) {
    this.getNote(id);
    this.setState({ index }, () => {
      this.setAppMode("note", ["return", "edit"]);
    });
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

    if (this.state.appMode === "create") {
      note.created = Helpers.generateTimestamp();
    }
    note.updated = Helpers.generateTimestamp();
    this.setState({ note }, () => {
      API.saveNote(note).then(result => {
        if (result !== null) {
          window.alert("Successfully saved new note");
        } else {
          window.alert("Error saving note");
        }
      });
    });
  }
  updateNoteState(note) {
    this.setState({ note });
  }
  updateNote() {
    const note = Object.assign({}, this.state.note);

    note.updated = Helpers.generateTimestamp();
    this.setState({ note }, () => {
      API.updateNote(note).then(result => {
        if (result !== null) {
          window.alert("Successfully updated note");
          this.setAppMode("note", ["return", "edit"]);
        } else {
          window.alert("Error updating note");
        }
      });
    });
  }
  deleteNote(id, title) {
    if (window.confirm(`Do you want to delete note ${title}?`)) {
      API.deleteNote(id).then(result => {
        if (result !== null) {
          window.alert("Successfully deleted note");
          this.getAllNotes();
        } else {
          window.alert("Error deleting note");
        }
      });
    }
  }
  returnToList() {
    this.getAllNotes();
    this.setState({
      actions: ["create"],
      note: {},
      appMode: "list",
      index: null
    });
  }
  render() {
    const note = this.state.note;

    return (
      <div className="NotesContainer">
        <div className="NotesContainer__inner">
          <NoteActions
            actions={this.state.actions}
            setAppMode={this.setAppMode.bind(this)}
            returnToList={this.returnToList.bind(this)}
            onSaveNote={this.saveNote.bind(this)}
            onUpdateNote={this.updateNote.bind(this)}
          />
          <NotesList
            notes={this.state.notes}
            appMode={this.state.appMode}
            setCurrentNote={this.setCurrentNote.bind(this)}
            onDeleteNote={this.deleteNote.bind(this)}
          />
          <CreateNote
            appMode={this.state.appMode}
            note={note}
            onTitleChange={this.setTitle.bind(this)}
            onContentChange={this.setContent.bind(this)}
          />
          <EditNote
            appMode={this.state.appMode}
            key={note.guid}
            note={note}
            onTitleUpdate={this.setTitle.bind(this)}
            onContentUpdate={this.setContent.bind(this)}
          />
          <Note appMode={this.state.appMode} note={note} />
        </div>
      </div>
    );
  }
}
