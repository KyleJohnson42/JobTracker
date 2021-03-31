import React from 'react';
import axios from 'axios';

import JobMetrics from './components/JobMetrics.jsx';
import JobListings from './components/JobListings.jsx';
import AddJobModal from './components/AddJobModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobsNotYetApplied: [],
      jobsApplied: [],
      jobsPhone: [],
      jobsInterview: [],
      jobsOffer: [],
      filters: [],
      displayedJobs: [],
      addJobModal: false
    }

    this.getAllJobs = this.getAllJobs.bind(this);
    this.updateMetrics = this.updateMetrics.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.addJob = this.addJob.bind(this);
    this.toggleAddJobModal = this.toggleAddJobModal.bind(this);
  }

  getAllJobs(callback = () => {}) {
    axios.get('/api/jobs')
    .then(results => this.setState({
      jobs: results.data
    }, callback))
    .catch(error => console.error(error));
  }

  updateMetrics(display = this.state.jobs) {
    const { jobs } = this.state;

    let jobsNotYetApplied = [];
    let jobsApplied = [];
    let jobsPhone = [];
    let jobsInterview = [];
    let jobsOffer = [];

    for (let i = 0; i < jobs.length; i++) {
      let job = jobs[i];

      if (!job.applied) {
        jobsNotYetApplied.push(job);
      } else {
        jobsApplied.push(job);
      }
      if (job.phone) {
        jobsPhone.push(job);
      }
      if (job.interview) {
        jobsInterview.push(job);
      }
      if (job.offer) {
        jobsOffer.push(job);
      }
    }

    this.setState({
      jobsNotYetApplied,
      jobsApplied,
      jobsPhone,
      jobsInterview,
      jobsOffer,
      displayedJobs: display
    });
  }

  handleFilter(filter) {
    const { filters } = this.state;

    if (filters.includes(filter)) {
      filters.splice(filters.indexOf(filter), 1);
    } else {
      filters.push(filter);
    }

    this.setState({
      filters
    }, this.updateDisplay);
  }

  updateDisplay() {
    const { jobs, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters } = this.state;

    if (filters.length === 0) {
      this.setState({
        displayedJobs: jobs
      });
      return;
    }

    let result = [];
    let notYetApplied = filters.includes('notYetApplied');
    let applied = filters.includes('applied');
    let phone = filters.includes('phone');
    let interview = filters.includes('interview');
    let offer = filters.includes('offer');
    let active = filters.includes('active');
    let inactive = filters.includes('inactive');

    for (let i = 0; i < jobs.length; i++) {
      let job = jobs[i];

      if (offer && job.offer) {
        if ((active && job.active) || (inactive && !job.active) || (!active && !inactive)) {
          result.push(job);
        }
      } else if (interview && job.interview && !job.offer) {
        if ((active && job.active) || (inactive && !job.active) || (!active && !inactive)) {
          result.push(job);
        }
      } else if (phone && job.phone && !job.interview) {
        if ((active && job.active) || (inactive && !job.active) || (!active && !inactive)) {
          result.push(job);
        }
      } else if (applied && job.applied && !job.phone) {
        if ((active && job.active) || (inactive && !job.active) || (!active && !inactive)) {
          result.push(job);
        }
      } else if (!job.applied && notYetApplied) {
        if ((active && job.active) || (inactive && !job.active) || (!active && !inactive)) {
          result.push(job);
        }
      }
    }

    this.setState({
      displayedJobs: result
    });
  }

  addJob(job) {
    axios.post('/api/jobs', job)
    .then(() => this.getAllJobs(this.updateMetrics))
    .catch(error => console.error(error));
  }

  toggleAddJobModal() {
    this.setState({
      addJobModal: !this.state.addJobModal
    });
  }

  componentDidMount() {
    this.getAllJobs(this.updateMetrics);
  }

  render() {
    const { jobs, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters, displayedJobs, addJobModal } = this.state;

    return (
      <React.Fragment>
        <h1>JobTracker</h1>
        <div className="main-display">
          <JobMetrics jobs={jobs.length} jobsNotYetApplied={jobsNotYetApplied.length} jobsApplied={jobsApplied.length} jobsPhone={jobsPhone.length} jobsInterview={jobsInterview.length} jobsOffer={jobsOffer.length} filters={filters} handleFilter={this.handleFilter} />
          <JobListings jobs={displayedJobs} />
        </div>
        {addJobModal &&
          <AddJobModal addJob={this.addJob} toggleAddJobModal={this.toggleAddJobModal} />
        }
        <div className="buttons">
          <button className="add-job-button" onClick={this.toggleAddJobModal}>Add Job</button>
          <button className="delete-all-jobs-button" onClick={() => {}}>Delete All Jobs</button>
        </div>
      </React.Fragment>
    )
  }
}

export default App;