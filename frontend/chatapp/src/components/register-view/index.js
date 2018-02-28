import React, {Component} from 'react'


const baseURL = 'http://localhost:3000/users'

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: '',
      confirmPassword: '',
    };

    this.handleNickChange = this.handleNickChange.bind(this);
    this.handlePswdChange = this.handlePswdChange.bind(this);
    this.handlePswdConfChange = this.handlePswdConfChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isConfirmedPassword = this.isConfirmedPassword.bind(this);
    this.create = this.create.bind(this);
  }

  handleNickChange(event) {
    this.setState({nickname: event.target.value});
  }

  handlePswdChange(event) {
    this.setState({password: event.target.value});
  }

  handlePswdConfChange(event) {
    this.setState({confirmPassword: event.target.value});
  }

  isConfirmedPassword() {
    return (this.state.confirmPassword === this.state.password);
  }

  handleSubmit(event) {
    if (this.isConfirmedPassword()) {
      console.log('A user was submitted: ' + this.state.nickname);
      this.create();
    } else {
      console.log('Password does not match');
    }
    event.preventDefault();
  }

  create() {
    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: this.state.nickname,
        password: this.state.password
      })
    })
  }


  render() {
    return (
      <div>
        <h2>
          Register user
        </h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Nickname:
            <input type="text" value={this.state.nickname} onChange={this.handleNickChange} />
          </label>
          <br/>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePswdChange} />
          </label>
          <br/>
          <label>
            Password again:
            <input type="password" value={this.state.confirmPassword} onChange={this.handlePswdConfChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default RegisterView
