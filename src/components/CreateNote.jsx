import React from "react";

import NoteCreateEditor from "../components/NoteCreateEditor.jsx";

export default class CreateNote extends React.Component {
  onDraftChange(newObj) {
    this.props.onDraftChange(newObj);
  }
  render() {
    if (this.props.appMode === "create") {
      return (
        <div className="CreateNote">
          <NoteCreateEditor
            note={this.props.note}
            onDraftChange={this.onDraftChange.bind(this)}
          />
        </div>
      );
    } else {
      return <div className="CreateNote isHidden" />;
    }
  }
}
