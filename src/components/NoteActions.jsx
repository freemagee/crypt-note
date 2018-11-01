import React from "react";

export default class NoteActions extends React.Component {
  returnToList() {
    this.props.returnToList();
  }
  setEditMode() {
    this.props.setEditMode(true);
  }
  cancelEditMode() {
    this.props.setEditMode(false);
  }
  updateNote() {
    this.props.onUpdateNote();
  }
  render() {
    const returnBtnClass =
      !this.props.editMode && this.props.appMode !== "list"
        ? "NoteActions__return"
        : "NoteActions__return NoteActions__return--isHidden";
    const saveBtnClass = "NoteActions__save NoteActions__save--isHidden";
    const createBtnClass = "NoteActions__create NoteActions__create--isHidden";
    const cancelEditBtnClass =
      this.props.editMode && this.props.appMode === "note"
        ? "NoteActions__cancel"
        : "NoteActions__cancel NoteActions__cancel--isHidden";
    const editBtnClass =
      !this.props.editMode && this.props.appMode === "note"
        ? "NoteActions__edit"
        : "NoteActions__edit NoteActions__edit--isHidden";
    const updateBtnClass =
      this.props.editMode && this.props.appMode === "note"
        ? "NoteActions__update"
        : "NoteActions__update NoteActions__update--isHidden";

    return (
      <div className="NoteActions">
        <button
          type="button"
          className={returnBtnClass}
          onClick={this.returnToList.bind(this)}
        >
          Return to list
        </button>

        <button
          type="button"
          className={cancelEditBtnClass}
          onClick={this.cancelEditMode.bind(this)}
        >
          Cancel
        </button>

        <button type="button" className={saveBtnClass}>
          Save new note
        </button>

        <button type="button" className={createBtnClass}>
          Create new note
        </button>

        <button
          type="button"
          className={editBtnClass}
          onClick={this.setEditMode.bind(this)}
        >
          Edit note
        </button>

        <button
          type="button"
          className={updateBtnClass}
          onClick={this.updateNote.bind(this)}
        >
          Update note
        </button>
      </div>
    );
  }
}
