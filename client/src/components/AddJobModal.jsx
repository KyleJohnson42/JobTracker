import React from 'react';

class AddJobModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      title: '',
      company: '',
      link: '',
      notes: '',
      applied: false,
      phone: false,
      interview: false,
      offer: false,
      active: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    let value = event.target.value;

    if (field === 'title') {
      this.setState({
        title: value
      });
    } else if (field === 'company') {
      this.setState({
        company: value
      });
    } else if (field === 'link') {
      this.setState({
        link: value
      });
    } else if (field === 'notes') {
      this.setState({
        notes: value
      });
    } else if (field === 'applied') {
      this.setState({
        applied: !this.state.applied
      });
    } else if (field === 'phone') {
      this.setState({
        phone: !this.state.phone
      });
    } else if (field === 'interview') {
      this.setState({
        interview: !this.state.interview
      });
    } else if (field === 'offer') {
      this.setState({
        offer: !this.state.offer
      });
    }
  }

  handleSubmit(event) {
    const { addJob } = this.props;

    event.preventDefault();
    addJob(this.state);
  }

  render() {
    const { addJob, toggleAddJobModal } = this.props;

    return (
      <React.Fragment>
        <form className="add-job modal" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Job Title:
            <input type="text" name="title" onChange={event => { this.handleChange(event, 'title') }}></input>
          </label><br />
          <label htmlFor="company">Company:
            <input type="text" name="company" onChange={event => { this.handleChange(event, 'company') }}></input>
          </label><br />
          <label htmlFor="link">Link to Job Posting:
            <input type="url" name="link" onChange={event => { this.handleChange(event, 'link') }}></input>
          </label><br />
          <label htmlFor="notes">Additional Notes:
            <textarea name="notes" onChange={event => { this.handleChange(event, 'notes') }}></textarea>
          </label><br />
          <label htmlFor="applied">Have you applied to this job?
            <input type="checkbox" name="applied" onChange={event => { this.handleChange(event, 'applied') }}></input>
          </label><br />
          <label htmlFor="phone">Have you been asked for a phone screen?
            <input type="checkbox" name="phone" onChange={event => { this.handleChange(event, 'phone') }}></input>
          </label><br />
          <label htmlFor="interview">Have you been asked for an interview?
            <input type="checkbox" name="interview" onChange={event => { this.handleChange(event, 'interview') }}></input>
          </label><br />
          <label htmlFor="offer">Have you received an offer?
            <input type="checkbox" name="offer" onChange={event => { this.handleChange(event, 'offer') }}></input>
          </label><br />
          <input type="submit"></input>
        </form>
        <div className="overlay" onClick={toggleAddJobModal} />
      </React.Fragment>
    )
  }
}

export default AddJobModal;