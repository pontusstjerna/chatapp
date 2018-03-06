import React, {Component} from 'react'
import { Button, Form, Grid , Message} from 'semantic-ui-react'
import {
  registerUser
} from '../../data/socket';

class RegisterView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: '',
      confirmPassword: '',
      passwordConf: true,
      formError: false,
      errorMsg: ''
    };

    this.handleNickChange = this.handleNickChange.bind(this);
    this.handlePswdChange = this.handlePswdChange.bind(this);
    this.handlePswdConfChange = this.handlePswdConfChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleNickChange(event) {
    this.setState({nickname: event.target.value});
  }

  handlePswdChange(event) {
    this.setState({password: event.target.value, passwordConf: event.target.value === this.state.confirmPassword});
  }

  handlePswdConfChange(event) {
    this.setState({
      confirmPassword: event.target.value,
      passwordConf: event.target.value === this.state.password,
    });
  }

  handleSubmit(event) {
    if (this.state.passwordConf) {
      console.log('A user was submitted: ' + this.state.nickname);

      let user = {nickname: this.state.nickname, password: this.state.password};
      registerUser(user)
        .then(savedUser => {
            console.log("Registered User: ", savedUser);
        })
        .catch(err => {
            console.log("Failed to register: ", err);
        })

    } else {
      this.setState({errorMsg: "Passwords must match"});
      this.setState({formError: true})
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Grid centered columns={3}>
          <Grid.Column>
            <h2>
              Register user
            </h2>
            <Form error={this.state.formError} onSubmit={this.handleSubmit}>
              <Form.Input type="text" placeholder="Nickname" value={this.state.nickname} onChange={this.handleNickChange} />
              <Form.Input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePswdChange} />
              <Form.Input error={!this.state.passwordConf} type="password" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.handlePswdConfChange} />
              <Button type='submit'>Submit</Button>
              <Message
                error
                header='Action Forbidden'
                content={this.state.errorMsg}
              />
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default RegisterView
