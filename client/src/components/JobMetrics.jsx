import React from 'react';

import c3 from '../../../node_modules/c3/c3';

const JobMetrics = ({ jobs, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters, handleFilter }) => {
  var chart = c3.generate({
    bindTo: '#chart',
    data: {
      columns: [
          ['Not Yet Applied', jobsNotYetApplied],
          ['Applied', jobsApplied],
          ['Phone Screen', jobsPhone],
          ['Interview', jobsInterview],
          ['Offer', jobsOffer]
      ],
      colors: {
        'Not Yet Applied': 'blue',
        'Applied': 'red',
        'Phone Screen': 'green',
        'Interview': 'yellow',
        'Offer': 'gold'
      },
      type: 'donut',
    },
    donut: {
      title: 'Your Metrics',
      label: {
        format: v => v
      },
    }
  });

  return (
    <div className="job-metrics">
      <div className="data-visualization">
        <div id="chart"></div>
        <h3>Conversion Rates</h3>
        <span className="conversion">{`Applications to phone screens: ${(jobsPhone / jobsApplied * 100 || 0).toFixed(0)}%`}</span>
        <span className="conversion">{`Phone screens to interviews: ${(jobsInterview / jobsPhone * 100 || 0).toFixed(0)}%`}</span>
        <span className="conversion">{`Interviews to offers: ${(jobsOffer / jobsInterview * 100 || 0).toFixed(0)}%`}</span>
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
}

export default JobMetrics;