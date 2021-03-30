import React from 'react';

const ProgressBar = ({ job }) => {
  let text = '';
  let barStyle = {
    width: '25%',
    height: '10px',
    background: 'gray',
    transform: 'translateY(10%)'
  };

  if (job.offer) {
    text = 'Received offer!';
    barStyle.background = 'green';
  } else if (job.interview) {
    text = 'Asked for interview';
    barStyle.background = 'linear-gradient(to right, green 75%, gray 75% 100%)';
  } else if (job.phone) {
    text = 'Asked for phone screen';
    barStyle.background = 'linear-gradient(to right, green 50%, gray 50% 100%)';
  } else if (job.applied) {
    text = 'Applied';
    barStyle.background = 'linear-gradient(to right, green 25%, gray 25% 100%)';
  }

  return (
    <React.Fragment>
      <div style={barStyle} />
      <div className="job-stage">{text}</div>
    </React.Fragment>
  )
}

export default ProgressBar;