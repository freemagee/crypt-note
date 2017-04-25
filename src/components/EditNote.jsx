import React from 'react';
import ReactDOM from 'react-dom';

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.content};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({value: nextProps.content});
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    if (this.state.value !== this.props.content) {
      this.saveNote(this.state.value);
    }
    event.preventDefault();
  }
  saveNote(newVal) {
    this.props.saveNote(newVal);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.value} onChange={this.handleChange}></textarea>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}