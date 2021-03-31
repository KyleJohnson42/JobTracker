import React from 'react';

class EditJobModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.job._id,
      username: localStorage.getItem('username'),
      title: props.job.title,
      company: props.job.company,
      link: props.job.link,
      notes: props.job.notes,
      applied: props.job.applied,
      phone: props.job.applied,
      interview: props.job.interview,
      offer: props.job.offer,
      active: props.job.active
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
    const { editJob } = this.props;

    event.preventDefault();
    editJob(this.state);
  }

  render() {
    const { editJob, toggleEditJobModal } = this.props;
    const { title, company, link, notes, applied, phone, interview, offer } = this.state;

    return (
      <React.Fragment>
        <form className="edit-job modal" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Job Title:
            <input type="text" name="title" value={title} onChange={event => { this.handleChange(event, 'title') }}></input>
          </label><br />
          <label htmlFor="company">Company:
            <input type="text" name="company" value={company} onChange={event => { this.handleChange(event, 'company') }}></input>
          </label><br />
          <label htmlFor="link">Link to Job Posting:
            <input type="url" name="link" value={link} onChange={event => { this.handleChange(event, 'link') }}></input>
          </label><br />
          <label htmlFor="notes">Additional Notes:
            <textarea name="notes" value={notes} onChange={event => { this.handleChange(event, 'notes') }}></textarea>
          </label><br />
          <label htmlFor="applied">Have you applied to this job?
            <input type="checkbox" name="applied" checked={applied} onChange={event => { this.handleChange(event, 'applied') }}></input>
          </label><br />
          <label htmlFor="phone">Have you been asked for a phone screen?
            <input type="checkbox" name="phone" checked={phone} onChange={event => { this.handleChange(event, 'phone') }}></input>
          </label><br />
          <label htmlFor="interview">Have you been asked for an interview?
            <input type="checkbox" name="interview" checked={interview} onChange={event => { this.handleChange(event, 'interview') }}></input>
          </label><br />
          <label htmlFor="offer">Have you received an offer?
            <input type="checkbox" name="offer" checked={offer} onChange={event => { this.handleChange(event, 'offer') }}></input>
          </label><br />
          <input type="submit" value="Save Changes"></input>
        </form>
        <div className="overlay" onClick={toggleEditJobModal} />
      </React.Fragment>
    )
  }
}

export default EditJobModal;