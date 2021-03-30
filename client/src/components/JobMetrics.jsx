import React from 'react';

const JobMetrics = ({ jobs, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer }) => (
  <div className="job-metrics">
    <div className="data-visualization">
      <span>{`Of the ${jobs} jobs you're interested in...`}</span>
      <br />
      <span>{`${jobsNotYetApplied} are awaiting an application,`}</span>
      <br />
      <span>{`${jobsApplied} have been applied to,`}</span>
      <span className="conversion">{`${(jobsPhone / jobsApplied * 100).toFixed(0)}%`}</span>
      <span>{`${jobsPhone} have resulted in a request for a phone screen,`}</span>
      <span className="conversion">{`${(jobsInterview / jobsPhone * 100).toFixed(0)}%`}</span>
      <span>{`${jobsInterview} have resulted in a request for an interview,`}</span>
      <span className="conversion">{`${(jobsOffer / jobsInterview * 100).toFixed(0)}%`}</span>
      <span>{`${jobsOffer} have resulted in offers`}</span>
    </div>
  </div>
)

export default JobMetrics;