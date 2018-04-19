import React from 'react';
import ReactDOM from 'react-dom';

export default class NoteCreateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Type your new note here'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    //if (this.state.value !== this.props.content) {
      this.saveNewNote(this.state.value);
    //}
    event.preventDefault();
  }
  saveNewNote(newVal) {
    this.props.saveNewNote(newVal);
  }
  cancelCreate() {
    this.props.cancelCreateMode();
  }
  render() {
    return (
      <div className='NoteCreateEditor' data-create-mode={this.props.mode}>
        <form className='NoteCreateEditor__form' onSubmit={this.handleSubmit}>
          <button className='btn NoteCreate__cancel' type='button' onClick={this.cancelCreate.bind(this)}>Cancel and return to list</button>
          <button className='btn btn-primary NoteCreateEditor__save' type='submit'>Save new note</button>
          <textarea className='NoteCreateEditor__editor' onChange={this.handleChange} value={this.state.value}></textarea>
        </form>
      </div>
    );
  }
}