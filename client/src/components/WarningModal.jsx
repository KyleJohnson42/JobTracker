import React from 'react';

const WarningModal = ({ deleteAllJobs, toggleWarningModal }) => (
  <React.Fragment>
    <div className="warning modal">
      Are you sure you want to delete all jobs? This action is irreversible!
      <div className="warning-buttons">
        <button onClick={() => { deleteAllJobs(toggleWarningModal) }}>Yes</button>
        <button onClick={toggleWarningModal}>No</button>
      </div>
    </div>
    <div className="overlay" onClick={toggleWarningModal} />
  </React.Fragment>
)

export default WarningModal;