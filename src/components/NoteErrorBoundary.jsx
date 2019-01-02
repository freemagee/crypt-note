import React from "react";

export default class NoteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="Note__error">
          <h1 className="Note__errorTitle">Note error</h1>
          <p className="Note__errorContent">Can not parse note contents. Invalid HTML.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
