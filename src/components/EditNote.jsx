import React from "react";

export default class EditNote extends React.Component {
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
        ? "EditNote__title"
        : "EditNote__title is-invalid";
    const contentClass =
      this.props.note.content !== ""
        ? "EditNote__content"
        : "EditNote__content is-invalid";

    if (this.props.appMode === "edit") {
      return (
        <div className="EditNote">
          <div className="EditNote__control">
            <input
              className={titleClass}
              type="text"
              value={title}
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="EditNote__control">
            <textarea
              className={contentClass}
              value={content}
              name="content"
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    } else {
      return <div className="EditNote isHidden" />;
    }
  }
}
