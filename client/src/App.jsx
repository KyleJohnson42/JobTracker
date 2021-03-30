import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    }

    this.getAllJobs = this.getAllJobs.bind(this);
    this.updateMetrics = this.updateMetrics.bind(this);
  }

  getAllJobs(callback = () => {}) {

  }

  updateMetrics() {

  }

  componentDidMount() {
    this.getAllJobs(this.updateMetrics);
  }

  render() {
    return (
      <div>Hello, world!</div>
    )
  }
}

export default App;