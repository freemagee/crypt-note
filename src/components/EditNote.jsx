import React from "react";

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  parseData(val) {
    // This is simple parsing, but could be extensive, check for XSS etc...
    if (val === "") {
      return false;
    }

    return true;
  }
  handleTitleChange(event) {
    const value = event.target.value;

    if (this.parseData(value)) {
      // Do prop update
    }
  }
  handleContentChange(event) {
    const value = event.target.value;

    if (this.parseData(value)) {
      // Do prop update
    }
  }
  handleSubmit(event) {
    // if (this.parseData()) {
    //   this.onUpdateNote();
    // }
    event.preventDefault();
  }
  update() {
    // this.props.onUpdateNote({
    //   title: this.state.title,
    //   content: this.state.content
    // });
  }
  cancel() {
    this.props.editMode(false);
  }
  render() {
    const title = this.props.title;
    const content = this.props.content;
    const mode = this.props.mode;

    return (
      <div className="EditNote" data-edit-mode={mode}>
        <form className="EditNote__form" onSubmit={this.handleSubmit}>
          <div className="EditNote__control">
            <input
              className="EditNote__title"
              type="text"
              value={title}
              name="title"
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="EditNote__control">
            <textarea
              className="EditNote__content"
              value={content}
              name="content"
              onChange={this.handleContentChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
