import React from 'react';

import c3 from '../../../node_modules/c3/c3';

const JobMetrics = ({ jobs, jobsNotYetApplied, jobsApplied, jobsPhone, jobsInterview, jobsOffer, filters, handleFilter }) => {
  var chart = c3.generate({
    bindTo: '#chart',
    data: {
      columns: [
          ['Not Yet Applied', jobs === 0 ? 1 : jobsNotYetApplied],
          ['Applied', jobsApplied],
          ['Phone Screen', jobsPhone],
          ['Interview', jobsInterview],
          ['Offer', jobsOffer]
      ],
      colors: {
        'Not Yet Applied': 'lightGray',
        'Applied': 'rgb(178, 235, 178)',
        'Phone Screen': 'rgb(123, 253, 123)',
        'Interview': 'rgb(0, 226, 0)',
        'Offer': 'rgb(255, 235, 124)'
      },
      type: 'donut',
      onclick: data => {
        if (data.id === 'Not Yet Applied') {
          handleFilter('notYetApplied');
        } else if (data.id === 'Applied') {
          handleFilter('applied');
        } else if (data.id === 'Phone Screen') {
          handleFilter('phone');
        } else if (data.id === 'Interview') {
          handleFilter('interview');
        } else if (data.id === 'Offer') {
          handleFilter('offer');
        }
      }
    },
    legend: {
      item: {
        onclick: data => {
          console.log(data);
          if (data === 'Not Yet Applied') {
            handleFilter('notYetApplied');
          } else if (data === 'Applied') {
            handleFilter('applied');
          } else if (data === 'Phone Screen') {
            handleFilter('phone');
          } else if (data === 'Interview') {
            handleFilter('interview');
          } else if (data === 'Offer') {
            handleFilter('offer');
          }
        }
      }
    },
    donut: {
      title: 'Your Metrics',
      label: {
        format: v => jobs === 0 ? 0 : v
      },
    }
  });

  return (
    <div className="job-metrics">
      <div className="data-visualization">
        <div id="chart"></div>
        <h3>Conversion Rates</h3>
        <span className="conversion">Applications to phone screens: <strong>{`${(jobsPhone / jobsApplied * 100 || 0).toFixed(0)}%`}</strong></span>
        <span className="conversion">Phone screens to interviews: <strong>{`${(jobsInterview / jobsPhone * 100 || 0).toFixed(0)}%`}</strong></span>
        <span className="conversion">Interviews to offers: <strong>{`${(jobsOffer / jobsInterview * 100 || 0).toFixed(0)}%`}</strong></span>
      </div>
      <h3>Filters</h3>
      <div className="filters">
        <div className={filters.includes('notYetApplied') ? "filter-on" : "filter-off"} onClick={() => handleFilter('notYetApplied')}>Not Yet Applied</div>
        <div className={filters.includes('applied') ? "filter-on" : "filter-off"} onClick={() => handleFilter('applied')}>Applied</div>
        <div className={filters.includes('phone') ? "filter-on" : "filter-off"} onClick={() => handleFilter('phone')}>Phone Screen</div>
        <div className={filters.includes('interview') ? "filter-on" : "filter-off"} onClick={() => handleFilter('interview')}>Interview</div>
        <div className={filters.includes('offer') ? "filter-on" : "filter-off"} onClick={() => handleFilter('offer')}>Offer</div>
        <div className={filters.includes('active') ? "filter-on" : "filter-off"} onClick={() => handleFilter('active')}>Active</div>
        <div className={filters.includes('inactive') ? "filter-on" : "filter-off"} onClick={() => handleFilter('inactive')}>Inactive</div>
      </div>
    </div>
  )
}

export default JobMetrics;