import React from 'react';

const Job = ({ job }) => (
  <div className="job">
    {`${job.title} at ${job.company}`}
  </div>
)

export default Job;