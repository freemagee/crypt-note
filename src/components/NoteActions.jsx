import React from "react";

export default class NoteActions extends React.Component {
  constructor(props) {
    super(props);

    this.buttonsList = [
      {
        type: "return",
        action: this.setListMode.bind(this),
        label: "Return to list"
      },
      {
        type: "cancel",
        action: this.setNoteMode.bind(this),
        label: "Cancel edit"
      },
      {
        type: "create",
        action: this.setCreateMode.bind(this),
        label: "Create new note"
      },
      {
        type: "preview",
        action: this.setPreviewMode.bind(this),
        label: "Preview"
      },
      {
        type: "save",
        action: this.doSaveNote.bind(this),
        label: "Save note"
      },
      {
        type: "edit",
        action: this.setEditMode.bind(this),
        label: "Edit note"
      },
      {
        type: "update",
        action: this.doUpdateNote.bind(this),
        label: "Update note"
      },
      {
        type: "back",
        action: this.setCreateMode.bind(this),
        label: "Back to new note"
      }
    ];
  }
  setListMode() {
    this.props.setAppMode("list");
  }
  setCreateMode() {
    this.props.setAppMode("create", ["return", "preview", "save"]);
  }
  setPreviewMode() {
    this.props.setAppMode("preview", ["back"]);
  }
  setEditMode() {
    this.props.setAppMode("edit", ["cancel", "update"]);
  }
  setNoteMode() {
    this.props.setAppMode("note", ["return", "edit"]);
  }
  doSaveNote() {
    this.props.onSaveNote();
  }
  doUpdateNote() {
    this.props.onUpdateNote();
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.actions !== nextProps.actions) {
      return true;
    }

    return false;
  }
  render() {
    return (
      <div className="NoteActions">
        {this.props.actions.map(function(action, index) {
          const result = this.buttonsList.filter(btn => btn.type === action);
          const btn = result[0];

          return (
            <button type="button" key={index} className={`NoteActions__${btn.type}`} onClick={btn.action}>
              {btn.label}
            </button>
          );
        }, this)}
      </div>
    );
  }
}
