import React from "react";

export default class NoteCreateEditor extends React.Component {
  constructor(props) {
    super(props);
    const title =
      typeof this.props.note.title !== "undefined" ? this.props.note.title : "";
    const content =
      typeof this.props.note.content !== "undefined"
        ? this.props.note.content
        : "";
    this.state = {
      title: title,
      content: content
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Update internal state and then push state to parent component
    this.setState(
      {
        [name]: value
      },
      () => this.props.onDraftChange(this.state)
    );

    // if (name === "title") {
    //   this.props.onTitleChange(value);
    // }

    // if (name === "content") {
    //   this.props.onContentChange(value);
    // }
  }
  render() {
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
            value={this.state.title}
            name="title"
            placeholder="Please enter a title"
            onChange={this.handleChange}
          />
        </div>
        <div className="NoteCreateEditor__control">
          <textarea
            className={contentClass}
            name="content"
            value={this.state.content}
            placeholder="Type your new note here"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
