import React from "react";
import ReactDOM from "react-dom";

import EditNote from "./EditNote.jsx";
import MarkdownNote from "./MarkdownNote.jsx";

export default class RenderedNote extends React.Component {
  returnToList(appMode) {
    this.props.returnToList(appMode);
  }
  editMode(mode) {
    this.props.setEditMode(mode);
  }
  saveNote(val) {
    this.props.saveNote(val);
  }
  render() {
    return (
      <div
        className="Note"
        data-app-mode={this.props.appMode}
        data-edit-mode={this.props.mode}
      >
        <MarkdownNote
          title={this.props.title}
          content={this.props.source}
          appMode={this.props.appMode}
          returnToList={this.returnToList.bind(this)}
          mode={this.props.mode}
          editMode={this.editMode.bind(this)}
        />
        <EditNote
          title={this.props.title}
          content={this.props.source}
          mode={this.props.mode}
          editMode={this.editMode.bind(this)}
          saveNote={this.saveNote.bind(this)}
        />
      </div>
    );
  }
}
