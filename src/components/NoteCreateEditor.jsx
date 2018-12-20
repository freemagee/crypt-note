import React from "react";

export default class NoteCreateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (name === "title") {
      this.props.onTitleChange(value);
    }

    if (name === "content") {
      this.props.onContentChange(value);
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.props.note, prevProps, prevState);
  // }
  componentDidMount() {
    //console.log(this.props.note);
    const title =
      typeof this.props.note.title !== "undefined" ? this.props.note.title : "";
    const content =
      typeof this.props.note.content !== "undefined"
        ? this.props.note.content
        : "";

    this.setState({
      title,
      content
    });
  }
  render() {
    return (
      <div className="NoteCreateEditor">
        <div className="NoteCreateEditor__control">
          <input
            className="NoteCreateEditor__title"
            type="text"
            value={this.state.title}
            name="title"
            placeholder="Please enter a title"
            onChange={this.handleChange}
          />
        </div>
        <div className="NoteCreateEditor__control">
          <textarea
            className="NoteCreateEditor__content"
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
