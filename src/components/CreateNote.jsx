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
    if (this.props.appMode === "create") {
      return (
        <div className="CreateNote">
          <NoteCreateEditor
            note={this.props.note}
            onTitleChange={this.onTitleChange.bind(this)}
            onContentChange={this.onContentChange.bind(this)}
          />
        </div>
      );
    } else {
      return <div className="CreateNote isHidden" />;
    }
  }
}
