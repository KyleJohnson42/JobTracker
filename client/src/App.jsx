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
      addJobModal: false
    }

    this.getAllJobs = this.getAllJobs.bind(this);
    this.updateMetrics = this.updateMetrics.bind(this);
    this.addJob = this.addJob.bind(this);
    this.toggleAddJobModal = this.toggleAddJobModal.bind(this);
  }

  getAllJobs(callback = () => {}) {
    axios.get('/api/jobs')
    .then(results => this.setState({
      jobs: results.data
    }), callback)
    .catch(error => console.error(error));
  }

  updateMetrics() {
    const { jobs } = this.state;
    console.log(jobs);
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
    const { jobs, addJobModal } = this.state;

    return (
      <React.Fragment>
        <h1>JobTracker</h1>
        <div className="main-display">
          <JobMetrics jobs={jobs} />
          <JobListings jobs={jobs} />
        </div>
        {addJobModal &&
          <AddJobModal addJob={this.addJob} />
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