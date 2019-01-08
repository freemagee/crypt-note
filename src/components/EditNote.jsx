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
  static getDerivedStateFromProps(nextProps, nextState) {
    if (
      nextProps.note.title !== nextState.title ||
      nextProps.note.content !== nextState.content
    ) {
      // The props have changed. So update state accordingly.
      return {
        title: nextProps.note.title,
        content: nextProps.note.content
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    // The following update the data in a parent component, which will eventually come back to this component via props.
    if (name === "title") {
      this.props.onTitleUpdate(value);
    }

    if (name === "content") {
      this.props.onContentUpdate(value);
    }
  }
  render() {
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
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="EditNote__control">
            <textarea
              className={contentClass}
              value={this.state.content}
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
