import React from "react";

import NoteCreateEditor from "../components/NoteCreateEditor.jsx";

export default class CreateNote extends React.Component {
  onTitleChange(newVal) {
    this.props.onTitleChange(newVal);
  }
  onContentChange(newVal) {
    this.props.onContentChange(newVal);
  }
  render() {
    return (
      <div className="CreateNote" data-app-mode={this.props.appMode}>
        <NoteCreateEditor
          onTitleChange={this.onTitleChange.bind(this)}
          onContentChange={this.onContentChange.bind(this)}
        />
      </div>
    );
  }
}
