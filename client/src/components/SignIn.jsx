import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleSubmit() {
    const { username } = this.state;

    localStorage.setItem('username', username);
  }

  render() {
    return (
      <React.Fragment>
        <form className="sign-in modal" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:
              <input type="text" name="username" onChange={this.handleChange}></input>
          </label><br />
          <input type="submit" value="Sign in"></input>
        </form>
        <div className="overlay" />
      </React.Fragment>
    )
  }
}

export default SignIn;