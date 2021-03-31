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

  toggleEditJobModal() {
    this.setState({
      editJobModal: !this.state.editJobModal
    });
  }

  render() {
    const { job, editJob } = this.props;
    const { editJobModal } = this.state;

    return (
      <React.Fragment>
        <div className="job">
          <a href={job.link} className="job-link">{`${job.title} at ${job.company}`}</a>
          <ProgressBar job={job} toggleEditJobModal={this.toggleEditJobModal} />
        </div>
        {editJobModal &&
          <EditJobModal job={job} editJob={editJob} toggleEditJobModal={this.toggleEditJobModal} />
        }
      </React.Fragment>
    )
  }
}

export default Job;