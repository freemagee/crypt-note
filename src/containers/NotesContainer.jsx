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
      draft: {},
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
  hasNoteChanged() {
    // This is intended to deal with editing notes
    // When editing a note -> then cancelling that edit, the state.note could be different to it's pre edited state. But it needs "reseting" back.
    // If the note has been edited and saved, then the state.note version will have a future updated value and therefore is different.
    const archivedNoteUpdated = this.state.notes[this.state.index].updated;
    const currentNoteUpdated = this.state.note.updated;

    // TODO: This logic breaks if a note is updated and then re-edited as the note will have a new "updated" value. Going to try to fix this in a branch
    if (archivedNoteUpdated < currentNoteUpdated) {
      // The state.note is different to it's equivalent in state.notes[state.index].
      return this.state.note;
    } else {
      // The note has not been updated, so use the archived note
      return this.state.notes[this.state.index];
    }
  }
  setAppMode(appMode, actions) {
    // Used to determine appMode based differences
    switch (appMode) {
      case "list":
        this.returnToList();
        break;
      case "edit":
        this.setState({
          draft: Object.assign({}, this.state.note),
          appMode,
          actions
        });
        break;
      case "note":
        // Determine if note has changed
        this.setState({
          note: Object.assign({}, this.hasNoteChanged()),
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
  setDraft(obj) {
    const { title, content } = obj;
    const draft = Object.assign({}, this.state.draft);

    draft.title = title;
    draft.content = content;
    this.updateDraftState(draft);
  }
  saveNote() {
    const note = Object.assign({}, this.state.draft);

    if (this.validateNote() === false) {
      window.alert("Note must have title and content");
      return;
    }

    if (this.state.appMode === "create") {
      note.created = Helpers.generateTimestamp();
    }

    note.updated = Helpers.generateTimestamp();
    API.saveNote(note).then(result => {
      if (result !== null) {
        window.alert("Successfully saved new note");
        this.setState(
          {
            draft: {}
          },
          () => this.props.setAppMode("list")
        );
      } else {
        window.alert("Error saving note");
      }
    });
  }
  updateDraftState(draft) {
    this.setState({ draft });
  }
  updateNoteState(note) {
    this.setState({ note });
  }
  updateNote() {
    const note = Object.assign({}, this.state.draft);

    if (this.validateNote() === false) {
      window.alert("Note must have title and content");
      return;
    }

    note.updated = Helpers.generateTimestamp();
    API.updateNote(note).then(result => {
      if (result !== null) {
        window.alert("Successfully updated note");
        this.setState({ note, draft: {} }, () => {
          this.setAppMode("note", ["return", "edit"]);
        });
      } else {
        window.alert("Error updating note");
      }
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
  validateNote() {
    if (this.state.note.title === "" || this.state.note.content === "") {
      return false;
    }

    return true;
  }
  returnToList() {
    this.getAllNotes();
    this.setState({
      actions: ["create"],
      note: {},
      draft: {},
      appMode: "list",
      index: null
    });
  }
  render() {
    const note = this.state.note;
    const draft = this.state.draft;
    let activeNote = note;

    // The Note component is used to render a note from the notes list, or a preview of a new note in create mode. Therefore the note source for it's props can vary dependent on appMode
    if (this.state.appMode === "preview") {
      activeNote = draft;
    }

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
            note={draft}
            onDraftChange={this.setDraft.bind(this)}
          />
          <EditNote
            appMode={this.state.appMode}
            note={draft}
            onDraftChange={this.setDraft.bind(this)}
          />
          <Note appMode={this.state.appMode} note={activeNote} />
        </div>
      </div>
    );
  }
}
