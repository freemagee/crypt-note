import React from "react";

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: ""
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        content: nextProps.note.content,
        title: nextProps.note.title
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

    if (name === "title") {
      this.props.onTitleUpdate(value);
    }

    if (name === "content") {
      this.props.onContentUpdate(value);
    }
  }
  // handleSubmit(event) {
  //   if (this.state.note.content !== this.props.note.content) {
  //     this.saveNote(this.state.note.content);
  //   }
  //   event.preventDefault();
  // }
  render() {
    return (
      <div className="EditNote" data-edit-mode={this.props.mode}>

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
            />
          </div>

      </div>
    );
  }
}
