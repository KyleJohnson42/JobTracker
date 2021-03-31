import React from 'react';

const JobMetrics = ({ jobs, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters, handleFilter }) => (
  <div className="job-metrics">
    <div className="data-visualization">
      <span>{`Of the ${jobs} jobs you're interested in...`}</span>
      <br />
      <span>{`${jobsNotYetApplied} are awaiting an application,`}</span>
      <br />
      <span>{`${jobsApplied} have been applied to,`}</span>
      <span className="conversion">{`${(jobsPhone / jobsApplied * 100 || 0).toFixed(0)}%`}</span>
      <span>{`${jobsPhone} have resulted in a request for a phone screen,`}</span>
      <span className="conversion">{`${(jobsInterview / jobsPhone * 100 || 0).toFixed(0)}%`}</span>
      <span>{`${jobsInterview} have resulted in a request for an interview,`}</span>
      <span className="conversion">{`${(jobsOffer / jobsInterview * 100 || 0).toFixed(0)}%`}</span>
      <span>{`${jobsOffer} have resulted in offers`}</span>
    </div>
    <br />
    <br />
    <div className="filters">
      <span>Select Filters:</span>
      <span className={filters.includes('notYetApplied') ? "filter-on" : "filter-off"} onClick={() => handleFilter('notYetApplied')}>Not Yet Applied</span>
      <span className={filters.includes('applied') ? "filter-on" : "filter-off"} onClick={() => handleFilter('applied')}>Applied</span>
      <span className={filters.includes('phone') ? "filter-on" : "filter-off"} onClick={() => handleFilter('phone')}>Phone Screen</span>
      <span className={filters.includes('interview') ? "filter-on" : "filter-off"} onClick={() => handleFilter('interview')}>Interview</span>
      <span className={filters.includes('offer') ? "filter-on" : "filter-off"} onClick={() => handleFilter('offer')}>Offer</span>
      <span className={filters.includes('active') ? "filter-on" : "filter-off"} onClick={() => handleFilter('active')}>Active</span>
      <span className={filters.includes('inactive') ? "filter-on" : "filter-off"} onClick={() => handleFilter('inactive')}>Inactive</span>
    </div>
  </div>
)

export default JobMetrics;