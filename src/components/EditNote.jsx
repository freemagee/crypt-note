import React from "react";

export default class EditNote extends React.Component {
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
      this.props.onTitleUpdate(value);
    }

    if (name === "content") {
      this.props.onContentUpdate(value);
    }
  }
  render() {
    const title =
      typeof this.props.note.title !== "undefined" ? this.props.note.title : "";
    const content =
      typeof this.props.note.content !== "undefined"
        ? this.props.note.content
        : "";

    if (this.props.appMode === "edit") {
      return (
        <div className="EditNote">
          {title !== "" && (
            <div className="EditNote__control">
              <input
                className="EditNote__title"
                type="text"
                value={title}
                name="title"
                onChange={this.handleChange}
              />
            </div>
          )}
          {content !== "" && (
            <div className="EditNote__control">
              <textarea
                className="EditNote__content"
                value={content}
                name="content"
                onChange={this.handleChange}
              />
            </div>
          )}
        </div>
      );
    } else {
      return <div className="EditNote isHidden" />;
    }
  }
}
