import React from 'react';

import Job from './Job.jsx';

const JobListings = ({ jobs }) => (
  <div className="job-listings">{jobs.map(job => <Job key={job._id} job={job} />)}</div>
)

export default JobListings;