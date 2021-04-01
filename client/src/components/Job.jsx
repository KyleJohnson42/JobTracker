import React from 'react';

import ProgressBar from './ProgressBar.jsx';
import EditJobModal from './EditJobModal.jsx';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editJobModal: false
    }

    this.toggleEditJobModal = this.toggleEditJobModal.bind(this);
  }

  toggleEditJobModal(event) {
    if (!event || event.target.className !== 'job-link ref') {
      document.body.style.overflow = this.state.editJobModal ? 'scroll' : 'hidden';
      this.setState({
        editJobModal: !this.state.editJobModal
      });
    }
  }

  render() {
    const { job, editJob, deleteJob } = this.props;
    const { editJobModal } = this.state;

    return (
      <React.Fragment>
        <div className={'job ' + (job.active ? 'active ' : 'inactive ') + (job.offer ? 'offer' : '')}>
          <div className="job-link" onClick={this.toggleEditJobModal}>
            <a href={job.link} className="job-link ref">{`${job.title} at ${job.company}`}</a>
          </div>
          <ProgressBar job={job} toggleEditJobModal={this.toggleEditJobModal} />
        </div>
        {editJobModal &&
          <EditJobModal job={job} editJob={editJob} deleteJob={deleteJob} toggleEditJobModal={this.toggleEditJobModal} />
        }
      </React.Fragment>
    )
  }
}

export default Job;