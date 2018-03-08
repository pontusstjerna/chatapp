import React, {Component} from 'react'
import {
  Button,
  Form,
  Grid,
  Message
} from 'semantic-ui-react'
import {
  registerUser
} from '../../data/socket';

class RegisterView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      passwordConf: true,
      formError: false,
      errorMsg: ''
    };

    this.handlePswdConfChange = this.handlePswdConfChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

      let user = {
        email: this.state.email,
        nickname: this.state.nickname,
        password: this.state.password,
      };
      registerUser(user)
        .then(savedUser => {
            console.log("Registered User: ", savedUser);
        })
        .catch(err => {
            console.log("Failed to register: ", err);
        })

    } else {
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
              <Form.Input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}
              />
              <Form.Input
                type="text"
                placeholder="Nickname"
                value={this.state.nickname}
                onChange={e => this.setState({nickname: e.target.value})}
              />
              <Form.Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({password: e.target.value})}
              />
              <Form.Input
                error={!this.state.passwordConf}
                type="password"
                placeholder="Confirm password"
                value={this.state.confirmPassword}
                onChange={this.handlePswdConfChange}
              />
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
