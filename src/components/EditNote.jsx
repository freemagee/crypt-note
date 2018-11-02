import React from "react";

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.note.title,
      content: this.props.note.content
    };

    this.handleChange = this.handleChange.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // TODO: Refactor -> as this is an anti-pattern
    // ref: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
    const matches = (obj, source) =>
      Object.keys(source).every(
        key => obj.hasOwnProperty(key) && obj[key] === source[key]
      );

    if (!matches(this.props.note, nextProps.note)) {
      this.setState({
        title: nextProps.note.title,
        content: nextProps.note.content
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
