import React from "react";
import ReactDOM from "react-dom";

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      title: this.props.title
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        content: nextProps.content,
        title: nextProps.title
      });
    }
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
    if (this.state.content !== this.props.content || this.state.title !== this.props.title) {
      this.saveNote({
        title: this.state.title,
        content: this.state.content
      });
    }

    event.preventDefault();
  }
  saveNote(newNoteObj) {
    this.props.saveNote(newNoteObj);
  }
  cancelEdit() {
    this.props.editMode(false);
  }
  render() {
    return (
      <div className="EditNote" data-edit-mode={this.props.mode}>
        <form className="EditNote__form" onSubmit={this.handleSubmit}>
          <div className="EditNote__actions">
            <button
              className="EditNote__cancel"
              type="button"
              onClick={this.cancelEdit.bind(this)}
            >
              Cancel
            </button>
            <button className="EditNote__save" type="submit">
              Save
            </button>
          </div>
          <div className="EditNote__control">
            <input
              className="EditNote__title"
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="EditNote__control">
            <textarea
              className="EditNote__content"
              value={this.state.content}
              name="content"
              onChange={this.handleChange}
            ></textarea>
          </div>
        </form>
      </div>
    );
  }
}
