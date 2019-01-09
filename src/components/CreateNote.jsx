import React from "react";

import NoteEditor from "../components/NoteEditor.jsx";

export default class CreateNote extends React.Component {
  onDraftChange(newObj) {
    this.props.onDraftChange(newObj);
  }
  render() {
    if (this.props.appMode === "create") {
      return (
        <div className="CreateNote">
          <NoteEditor
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
