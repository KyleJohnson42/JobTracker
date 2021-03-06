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
      username: localStorage.username || '',
      quotes: [],
      quote: { author: '', text: '' },
      quoteVisible: true,
      searchTerm: '',
      jobs: [],
      jobsNotYetApplied: [],
      jobsApplied: [],
      jobsPhone: [],
      jobsInterview: [],
      jobsOffer: [],
      filters: [],
      filteredJobs: [],
      displayedJobs: [],
      addJobModal: false,
      warningModal: false
    }

    this.logOut = this.logOut.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.getQuotes = this.getQuotes.bind(this);
    this.changeQuote = this.changeQuote.bind(this);
    this.updateMetrics = this.updateMetrics.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.filterBySearchTerm = this.filterBySearchTerm.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.addJob = this.addJob.bind(this);
    this.editJob = this.editJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.deleteAllJobs = this.deleteAllJobs.bind(this);
    this.toggleQuoteVisibility = this.toggleQuoteVisibility.bind(this);
    this.toggleAddJobModal = this.toggleAddJobModal.bind(this);
    this.toggleWarningModal = this.toggleWarningModal.bind(this);
  }

  logOut() {
    localStorage.setItem('username', '');
    this.setState({
      username: ''
    });
  }

  getAllJobs(username, callback = () => {}) {
    if (username) {
      axios.get(`/api/jobs/${username}`)
      .then(results => {
        let result = [];

        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < results.data.length; j++) {
            let job = results.data[j];

            if (i === 0 && !job.applied) {
              result.push(job);
            } else if (i === 1 && job.offer) {
              result.push(job);
            } else if (i === 2 && job.interview && !job.offer) {
              result.push(job);
            } else if (i === 3 && job.phone && !job.interview) {
              result.push(job);
            } else if (i === 4 && job.applied && !job.phone) {
              result.push(job);
            }
          }
        }

        this.setState({
          jobs: result
        }, callback);
      })
      .catch(error => console.error(error));
    }
  }

  getQuotes(username, callback) {
    if (username) {
      axios.get('https://type.fit/api/quotes')
      .then(results => {
        this.setState({
          quotes: results.data,
          quote: results.data[Math.floor(Math.random() * results.data.length)]
        }, callback);
      })
      .catch(error => console.error(error));
    }
  }

  changeQuote() {
    const { quotes } = this.state;

    this.setState({
      quote: quotes[Math.floor(Math.random() * quotes.length)]
    });
  }

  updateMetrics() {
    const { jobs, searchTerm } = this.state;

    let jobsNotYetApplied = [];
    let jobsApplied = [];
    let jobsPhone = [];
    let jobsInterview = [];
    let jobsOffer = [];

    for (let i = 0; i < jobs.length; i++) {
      let job = jobs[i];

      if (!job.applied) {
        jobsNotYetApplied.push(job);
      } else if (job.applied && !job.phone) {
        jobsApplied.push(job);
      } else if (job.phone && !job.interview) {
        jobsPhone.push(job);
      } else if (job.interview && !job.offer) {
        jobsInterview.push(job);
      } else if (job.offer) {
        jobsOffer.push(job);
      }
    }

    this.setState({
      jobsNotYetApplied,
      jobsApplied,
      jobsPhone,
      jobsInterview,
      jobsOffer
    }, this.updateDisplay);
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

  handleSearchTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    }, this.updateDisplay);
  }

  filterBySearchTerm(jobs, searchTerm) {
    let result = [];

    if (!searchTerm) {
      return jobs;
    }

    for (let i = 0; i < jobs.length; i++) {
      let job = jobs[i];

      if (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
        result.push(job);
      }
    }

    return result;
  }

  updateDisplay() {
    const { jobs, searchTerm, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters } = this.state;

    if (filters.length === 0) {
      this.setState({
        displayedJobs: this.filterBySearchTerm(jobs, searchTerm)
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
        displayedJobs: this.filterBySearchTerm(activeFilter, searchTerm)
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
      displayedJobs: this.filterBySearchTerm(result, searchTerm)
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

    callback();

    axios.delete(`/api/jobs/${id}`)
    .then(() => {
      this.getAllJobs(username, this.updateMetrics);
    })
    .catch(error => console.error(error));
  }

  deleteAllJobs(callback) {
    const { username } = this.state;

    callback();

    axios.delete(`/api/jobs/all/${username}`)
    .then(() => {
      this.getAllJobs(username, this.updateMetrics);
    })
    .catch(error => console.error(error));
  }

  toggleQuoteVisibility() {
    this.setState({
      quoteVisible: !this.state.quoteVisible
    });
  }

  toggleAddJobModal() {
    document.body.style.overflow = this.state.addJobModal ? 'scroll' : 'hidden';
    this.setState({
      addJobModal: !this.state.addJobModal
    });
  }

  toggleWarningModal() {
    document.body.style.overflow = this.state.warningModal ? 'scroll' : 'hidden';
    this.setState({
      warningModal: !this.state.warningModal
    });
  }

  componentDidMount() {
    const { username } = this.state;

    this.getAllJobs(username, this.updateMetrics);
    this.getQuotes(username, () => {
      setTimeout(() => {
        setInterval(this.changeQuote, 13000);
      }, 3000);
      setInterval(() => {
        this.toggleQuoteVisibility();
        setTimeout(this.toggleQuoteVisibility, 3000);
      }, 13000);
    });
  }

  render() {
    const { username, jobs, quote, quoteVisible, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters, displayedJobs, addJobModal, warningModal } = this.state;

    return (
      <React.Fragment>
        {username &&
          <React.Fragment>
            <h1>JobTracker</h1>
            <h2 className={quoteVisible ? "quote-on" : "quote-off"}>{quote.text}</h2>
            <h3 className={quoteVisible ? "quote-on" : "quote-off"}>{`-${quote.author || 'Anonymous'}`}</h3>
            <div className="main-display">
              <JobMetrics jobs={jobs.length} jobsNotYetApplied={jobsNotYetApplied.length} jobsApplied={jobsApplied.length} jobsPhone={jobsPhone.length} jobsInterview={jobsInterview.length} jobsOffer={jobsOffer.length} filters={filters} handleFilter={this.handleFilter} />
              <JobListings jobs={displayedJobs} handleSearchTermChange={this.handleSearchTermChange} toggleAddJobModal={this.toggleAddJobModal} toggleWarningModal={this.toggleWarningModal} logOut={this.logOut} editJob={this.editJob} deleteJob={this.deleteJob} />
            </div>
            {addJobModal &&
              <AddJobModal addJob={this.addJob} toggleAddJobModal={this.toggleAddJobModal} />
            }
            {warningModal &&
              <WarningModal deleteAllJobs={this.deleteAllJobs} toggleWarningModal={this.toggleWarningModal} />
            }
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