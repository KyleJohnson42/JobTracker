import React from 'react';

import ProgressBar from './ProgressBar.jsx';

const Job = ({ job }) => (
  <div className="job">
    <a href={job.link}>{`${job.title} at ${job.company}`}</a>
    <ProgressBar job={job} />
  </div>
)

export default Job;