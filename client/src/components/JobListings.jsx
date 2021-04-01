import React from 'react';

import Job from './Job.jsx';

const JobListings = ({ jobs, handleSearchTermChange, toggleAddJobModal, toggleWarningModal, logOut, editJob, deleteJob }) => (
  <div className="job-listings-container">
    <div className="toolbar">
      <form>
        <label htmlFor="title">Search by job title or company:
          <input type="text" name="title" onChange={handleSearchTermChange}></input>
        </label>
      </form>
      <div className="buttons">
        <button className="add-job-button" onClick={toggleAddJobModal}>Add Job</button>
        <button className="delete-all-jobs-button" onClick={toggleWarningModal}>Delete All Jobs</button>
        <button className="log-out-button" onClick={logOut}>Log Out</button>
      </div>
    </div>
    <div className="job-listings">{jobs.map(job => <Job key={job._id} job={job} editJob={editJob} deleteJob={deleteJob} />)}</div>
  </div>
)

export default JobListings;