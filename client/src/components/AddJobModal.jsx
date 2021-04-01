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
      if (this.state.applied) {
        this.setState({
          applied: false,
          phone: false,
          interview: false,
          offer: false
        });
      } else {
        this.setState({
          applied: true
        });
      }
    } else if (field === 'phone') {
      if (this.state.phone) {
        this.setState({
          phone: false,
          interview: false,
          offer: false
        });
      } else {
        this.setState({
          phone: true
        });
      }
    } else if (field === 'interview') {
      if (this.state.interview) {
        this.setState({
          interview: false,
          offer: false
        });
      } else {
        this.setState({
          interview: true
        });
      }
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
    const { applied, phone, interview, offer } = this.state;

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
            <input type="checkbox" name="applied" checked={applied} onChange={event => { this.handleChange(event, 'applied') }}></input>
          </label><br />
          <label htmlFor="phone">Have you been asked for a phone screen?
            <input type="checkbox" name="phone" checked={phone} disabled={!applied} onChange={event => { this.handleChange(event, 'phone') }}></input>
          </label><br />
          <label htmlFor="interview">Have you been asked for an interview?
            <input type="checkbox" name="interview" checked={interview} disabled={!phone || !applied} onChange={event => { this.handleChange(event, 'interview') }}></input>
          </label><br />
          <label htmlFor="offer">Have you received an offer?
            <input type="checkbox" name="offer" checked={offer} disabled={!interview || !phone || !applied} onChange={event => { this.handleChange(event, 'offer') }}></input>
          </label><br />
          <input type="submit"></input>
        </form>
        <div className="overlay" onClick={toggleAddJobModal} />
      </React.Fragment>
    )
  }
}

export default AddJobModal;