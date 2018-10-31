import React from "react";

export default class NoteCreateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: "Type your new note here",
      title: "Please enter a title"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    this.saveNewNote({
      content: this.state.editor,
      title: this.state.title
    });

    event.preventDefault();
  }
  saveNewNote(newVal) {
    this.props.saveNewNote(newVal);
  }
  cancelCreate() {
    this.props.cancelCreateMode();
  }
  render() {
    return (
      <div className="NoteCreateEditor" data-create-mode={this.props.mode}>
        <form className="NoteCreateEditor__form" onSubmit={this.handleSubmit}>
          <div className="NoteCreateEditor__actions">
            <button
              className="NoteCreate__cancel"
              type="button"
              onClick={this.cancelCreate.bind(this)}
            >
              Cancel and return to list
            </button>
            <button className="NoteCreateEditor__save" type="submit">
              Save new note
            </button>
          </div>
          <div className="NoteCreateEditor__control">
            <input
              className="NoteCreateEditor__title"
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="NoteCreateEditor__control">
            <textarea
              className="NoteCreateEditor__editor"
              name="editor"
              value={this.state.editor}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
