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

  }

  updateMetrics() {

  }

  addJob() {

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
        <JobMetrics jobs={jobs} />
        <JobListings jobs={jobs} />
        {addJobModal &&
          <AddJobModal addJob={this.addJob} />
        }
        <button onClick={this.toggleAddJobModal}>Add Job</button>
      </React.Fragment>
    )
  }
}

export default App;