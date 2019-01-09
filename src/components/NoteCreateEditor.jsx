import React from "react";

export default class NoteCreateEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const stateOfValues = {
      title: this.props.note.title,
      content: this.props.note.content
    };
    const newValue = {
      [name]: value
    };
    // Use spread operator for object merge.
    // In the case of a key collision, the right-most (last) object's value wins out.
    const merged = { ...stateOfValues, ...newValue };

    this.props.onDraftChange(merged);
  }
  render() {
    // Initially the incoming notes props will be undefined, so handle that.
    const title =
      typeof this.props.note.title !== "undefined" ? this.props.note.title : "";
    const content =
      typeof this.props.note.content !== "undefined"
        ? this.props.note.content
        : "";
    const titleClass =
      this.props.note.title !== ""
        ? "NoteCreateEditor__title"
        : "NoteCreateEditor__title is-invalid";
    const contentClass =
      this.props.note.content !== ""
        ? "NoteCreateEditor__content"
        : "NoteCreateEditor__content is-invalid";

    return (
      <div className="NoteCreateEditor">
        <div className="NoteCreateEditor__control">
          <input
            className={titleClass}
            type="text"
            value={title}
            name="title"
            placeholder="Please enter a title"
            onChange={this.handleChange}
          />
        </div>
        <div className="NoteCreateEditor__control">
          <textarea
            className={contentClass}
            name="content"
            value={content}
            placeholder="Type your new note here"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
