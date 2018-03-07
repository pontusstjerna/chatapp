import React, {Component} from 'react'
import { Button, Form, Grid , Message} from 'semantic-ui-react'
import {
  createUser,
  registerCreateUser
} from '../../data/socket';
import { FormattedMessage } from 'react-intl';
import { Format } from 'react-intl-format';

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
    registerCreateUser((result) => {
      alert('User created!');
      console.log('User created');
    })
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
      createUser({nickname: this.state.nickname, password: this.state.password});
    } else {
      this.setState({errorMsg: "Passwords must match"});
      this.setState({formError: true})
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <Format>
        {intl => (
        <Grid centered columns={3}>
          <Grid.Column>
            <h2>
              <FormattedMessage id = "register.send" defaultMessage = "Send"/>
            </h2>
            <Form error={this.state.formError} onSubmit={this.handleSubmit}>
              <Form.Input type="text" placeholder={intl.formatMessage({id:'register.nickname'})} value={this.state.nickname} onChange={this.handleNickChange} />
              <Form.Input type="password" placeholder={intl.formatMessage({id:'register.password'})} value={this.state.password} onChange={this.handlePswdChange} />
              <Form.Input error={!this.state.passwordConf} type="password" placeholder={intl.formatMessage({id:'register.confirmPassword'})} value={this.state.confirmPassword} onChange={this.handlePswdConfChange} />
              <Button type='submit'><FormattedMessage id = "register.send" defaultMessage = "Send"/></Button>
              <Message
                error
                header='Action Forbidden'
                content={this.state.errorMsg}
              />
            </Form>
          </Grid.Column>
        </Grid>
        )}
        </Format>
      </div>
    );
  }
}

export default RegisterView
