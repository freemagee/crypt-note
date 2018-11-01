import React from "react";

export default class EnableEditNote extends React.Component {
  setEditMode() {
    this.props.editMode();
  }
  render() {
    return (
      <button className="MarkdownNote__edit" onClick={this.setEditMode.bind(this)}>
        Edit
      </button>
    );
  }
}
