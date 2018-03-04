import React, {Component} from 'react'
import { Button, Form, Grid , Message} from 'semantic-ui-react'

const baseURL = 'http://localhost:3000/users'

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

    this.handlePswdConfChange = this.handlePswdConfChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.create = this.create.bind(this);
  }

  handlePswdConfChange(event) {
    this.setState({
      confirmPassword: event.target.value,
      passwordConf: event.target.value === this.state.password,
    });
  }

  handleSubmit(event) {
    if (this.state.passwordConf) {
      this.create();
    } else {
      this.setState({formError: true})
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
        <Grid centered columns={3}>
          <Grid.Column>
            <h2>
              Register user
            </h2>
            <Form error={this.state.formError} onSubmit={this.handleSubmit}>
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
