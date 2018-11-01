import React from "react";

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const matches = (obj, source) =>
      Object.keys(source).every(
        key => obj.hasOwnProperty(key) && obj[key] === source[key]
      );

    if (!matches(this.props.note, nextProps.note)) {
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
