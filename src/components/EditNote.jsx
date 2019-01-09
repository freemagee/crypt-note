import React from "react";

import NoteEditor from "../components/NoteEditor.jsx";

export default class EditNote extends React.Component {
  onDraftChange(newObj) {
    this.props.onDraftChange(newObj);
  }
  render() {
    if (this.props.appMode === "edit") {
      return (
        <div className="EditNote">
          <NoteEditor
            note={this.props.note}
            onDraftChange={this.onDraftChange.bind(this)}
          />
        </div>
      );
    } else {
      return <div className="EditNote isHidden" />;
    }
  }
}
