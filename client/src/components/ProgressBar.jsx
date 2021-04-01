import React from 'react';

const ProgressBar = ({ job, toggleEditJobModal }) => {
  let text = 'Not yet applied';
  let barStyle = {
    width: '25%',
    height: '10px',
    background: 'lightGray',
    transform: 'translateY(10%)'
  };

  if (job.offer) {
    text = 'Received offer!';
    barStyle.background = 'rgb(123, 253, 123)';
  } else if (job.interview) {
    text = 'Asked for interview';
    barStyle.background = 'linear-gradient(to right, rgb(123, 253, 123) 75%, lightGray 75% 100%)';
  } else if (job.phone) {
    text = 'Asked for phone screen';
    barStyle.background = 'linear-gradient(to right, rgb(123, 253, 123) 50%, lightGray 50% 100%)';
  } else if (job.applied) {
    text = 'Applied';
    barStyle.background = 'linear-gradient(to right, rgb(123, 253, 123) 25%, lightGray 25% 100%)';
  }

  return (
    <React.Fragment>
      <div style={barStyle} onClick={toggleEditJobModal} />
      <div className="job-stage" onClick={toggleEditJobModal}>{text}</div>
    </React.Fragment>
  )
}

export default ProgressBar;