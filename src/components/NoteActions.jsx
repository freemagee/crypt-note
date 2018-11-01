import React from "react";

export default class NoteActions extends React.Component {
  returnToList() {
    this.props.returnToList();
  }
  render() {
    return (
      <div className="NoteActions">
        <button
          type="button"
          className="NoteActions__return"
          onClick={this.returnToList.bind(this)}
        >
          Return to list
        </button>

        <button type="button" className="NoteActions__cancel">
          Cancel
        </button>

        <button type="button" className="NoteActions__save">
          Save new note
        </button>

        <button type="button" className="NoteActions__create">
          Create new note
        </button>

        <button type="button" className="NoteActions__edit">
          Edit note
        </button>

        <button type="button" className="NoteActions__update">
          Update note
        </button>
      </div>
    );
  }
}
