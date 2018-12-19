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
      index: null,
      appMode: "list"
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }
  componentDidMount() {
    API.getAllNotes().then(result => {
      if (result !== null) {
        this.setState({ notes: result });
      } else {
        alert("Error retrieving notes");
      }
    });
  }
  setAppMode(appMode, actions) {
    if (appMode !== "list") {
      this.setState({ appMode, actions });
    } else {
      this.returnToList();
    }
  }
  returnToList() {
    this.setState(this.baseState);
  }
  setCurrentNote(noteContent, index) {
    const completeNote = Object.assign({}, this.state.notes[index]);
    completeNote.content = noteContent;

    this.setState(
      {
        note: completeNote,
        index: index
      },
      () => {
        this.state.notes[this.state.index] = completeNote;
        this.setAppMode("note", ["return", "edit"]);
      }
    );
  }
  setEditMode(mode) {
    this.setState({ appMode: mode });
    if (mode !== "edit") {
      const resetNote = Object.assign({}, this.state.notes[this.state.index]);

      this.setState({ note: resetNote });
    }
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
            actions={this.state.actions}
            setAppMode={this.setAppMode.bind(this)}
            returnToList={this.returnToList.bind(this)}
            onSaveNote={this.saveNote.bind(this)}
            onUpdateNote={this.saveNote.bind(this)}
          />
          <NotesList
            notes={this.state.notes}
            appMode={this.state.appMode}
            setCurrentNote={this.setCurrentNote.bind(this)}
          />
          <CreateNote
            appMode={this.state.appMode}
            onTitleChange={this.setTitle.bind(this)}
            onContentChange={this.setContent.bind(this)}
          />
          <EditNote
            appMode={this.state.appMode}
            key={this.state.index}
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
