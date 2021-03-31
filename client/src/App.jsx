import React from 'react';
import axios from 'axios';

import JobMetrics from './components/JobMetrics.jsx';
import JobListings from './components/JobListings.jsx';
import AddJobModal from './components/AddJobModal.jsx';
import WarningModal from './components/WarningModal.jsx';
import SignIn from './components/SignIn.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.username || null,
      jobs: [],
      jobsNotYetApplied: [],
      jobsApplied: [],
      jobsPhone: [],
      jobsInterview: [],
      jobsOffer: [],
      filters: [],
      displayedJobs: [],
      addJobModal: false,
      warningModal: false
    }

    this.getAllJobs = this.getAllJobs.bind(this);
    this.updateMetrics = this.updateMetrics.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.addJob = this.addJob.bind(this);
    this.editJob = this.editJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.deleteAllJobs = this.deleteAllJobs.bind(this);
    this.toggleAddJobModal = this.toggleAddJobModal.bind(this);
    this.toggleWarningModal = this.toggleWarningModal.bind(this);
  }

  getAllJobs(username, callback = () => {}) {
    if (username) {
      axios.get(`/api/jobs/${username}`)
      .then(results => this.setState({
        jobs: results.data
      }, callback))
      .catch(error => console.error(error));
    }
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

    let activeFilter = [];
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

      if ((active && job.active) || (inactive && !job.active) || (!active && !inactive)) {
        activeFilter.push(job);
      }
    }

    if (!offer && !interview && !phone && !applied && !notYetApplied) {
      this.setState({
        displayedJobs: activeFilter
      });
      return;
    }

    for (let i = 0; i < activeFilter.length; i++) {
      let job = activeFilter[i];

      if (offer && job.offer) {
        result.push(job);
      } else if (interview && job.interview && !job.offer) {
        result.push(job);
      } else if (phone && job.phone && !job.interview) {
        result.push(job);
      } else if (applied && job.applied && !job.phone) {
        result.push(job);
      } else if (notYetApplied && !job.applied ) {
        result.push(job);
      }
    }

    this.setState({
      displayedJobs: result
    });
  }

  addJob(job) {
    const { username } = this.state;

    axios.post('/api/jobs', job)
    .then(() => {
      this.getAllJobs(username, this.updateMetrics);
      this.toggleAddJobModal();
    })
    .catch(error => console.error(error));
  }

  editJob(job, callback) {
    const { username } = this.state;

    let id = job._id;
    delete job._id;

    axios.put(`/api/jobs/${id}`, job)
    .then(() => {
      callback();
      this.getAllJobs(username, this.updateMetrics);
    })
    .catch(error => console.error(error));
  }

  deleteJob(id, callback) {
    const { username } = this.state;

    axios.delete(`/api/jobs/${id}`)
    .then(() => {
      callback();
      this.getAllJobs(username, this.updateMetrics);
    })
    .catch(error => console.error(error));
  }

  deleteAllJobs(callback) {
    const { username } = this.state;

    axios.delete(`/api/jobs/all/${username}`)
    .then(() => {
      callback();
      this.getAllJobs(username, this.updateMetrics);
    })
    .catch(error => console.error(error));
  }

  toggleAddJobModal() {
    this.setState({
      addJobModal: !this.state.addJobModal
    });
  }

  toggleWarningModal() {
    this.setState({
      warningModal: !this.state.warningModal
    });
  }

  componentDidMount() {
    const { username } = this.state;

    this.getAllJobs(username, this.updateMetrics);
  }

  render() {
    const { username, jobs, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters, displayedJobs, addJobModal, warningModal } = this.state;

    return (
      <React.Fragment>
        {username &&
          <React.Fragment>
            <h1>JobTracker</h1>
            <div className="main-display">
              <JobMetrics jobs={jobs.length} jobsNotYetApplied={jobsNotYetApplied.length} jobsApplied={jobsApplied.length} jobsPhone={jobsPhone.length} jobsInterview={jobsInterview.length} jobsOffer={jobsOffer.length} filters={filters} handleFilter={this.handleFilter} />
              <JobListings jobs={displayedJobs} editJob={this.editJob} deleteJob={this.deleteJob} />
            </div>
            {addJobModal &&
              <AddJobModal addJob={this.addJob} toggleAddJobModal={this.toggleAddJobModal} />
            }
            {warningModal &&
              <WarningModal deleteAllJobs={this.deleteAllJobs} toggleWarningModal={this.toggleWarningModal} />
            }
            <div className="buttons">
              <button className="add-job-button" onClick={this.toggleAddJobModal}>Add Job</button>
              <button className="delete-all-jobs-button" onClick={this.toggleWarningModal}>Delete All Jobs</button>
            </div>
          </React.Fragment>
        }
        {!username &&
          <SignIn />
        }
      </React.Fragment>
    )
  }
}

export default App;