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
  cancelEdit() {
    this.props.editMode(false);
  }
  render() {
    return (
      <div className='Note__edit' data-edit-mode={this.props.mode}>
        <form className='EditNote__form' onSubmit={this.handleSubmit}>
          <button className='btn EditNote__cancel' type='button' onClick={this.cancelEdit.bind(this)}>Cancel</button>
          <button className='btn btn-primary EditNote__save' type='submit'>Save</button>
          <textarea className='EditNote__content' value={this.state.value} onChange={this.handleChange}></textarea>
        </form>
      </div>
    );
  }
}