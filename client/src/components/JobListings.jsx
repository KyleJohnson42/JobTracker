import React from 'react';

import Job from './Job.jsx';

const JobListings = ({ jobs, editJob, deleteJob }) => (
  <div className="job-listings">{jobs.map(job => <Job key={job._id} job={job} editJob={editJob} deleteJob={deleteJob} />)}</div>
)

export default JobListings;