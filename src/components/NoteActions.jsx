import React from "react";

export default class NoteActions extends React.Component {
  returnToList() {
    this.props.returnToList();
  }
  setCreateMode() {
    this.props.setCreateMode("create");
  }
  saveNewNote() {
    this.props.saveNewNote();
  }
  previewNote() {
    this.props.setPreviewMode("preview");
  }
  setEditMode() {
    this.props.setEditMode("edit");
  }
  cancelEditMode() {
    this.props.setEditMode("note");
  }
  updateNote() {
    this.props.onUpdateNote();
  }
  render() {
    const returnBtnClass =
      this.props.appMode !== "list"
        ? "NoteActions__return"
        : "NoteActions__return NoteActions__return--isHidden";
    const saveBtnClass =
      this.props.appMode === "create"
        ? "NoteActions__save"
        : "NoteActions__save NoteActions__save--isHidden";
    const previewBtnClass =
      this.props.appMode === "create"
        ? "NoteActions__preview"
        : "NoteActions__preview NoteActions__preview--isHidden";
    const createBtnClass =
      this.props.appMode === "list"
        ? "NoteActions__create"
        : "NoteActions__create NoteActions__create--isHidden";
    const cancelEditBtnClass =
      this.props.appMode === "edit"
        ? "NoteActions__cancel"
        : "NoteActions__cancel NoteActions__cancel--isHidden";
    const editBtnClass =
      this.props.appMode === "note"
        ? "NoteActions__edit"
        : "NoteActions__edit NoteActions__edit--isHidden";
    const updateBtnClass =
      this.props.appMode === "edit"
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
          Cancel edit
        </button>

        <button
          type="button"
          className={previewBtnClass}
          onClick={this.previewNote.bind(this)}
        >
          Preview
        </button>

        <button
          type="button"
          className={saveBtnClass}
          onClick={this.saveNewNote.bind(this)}
        >
          Save
        </button>

        <button
          type="button"
          className={createBtnClass}
          onClick={this.setCreateMode.bind(this)}
        >
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
