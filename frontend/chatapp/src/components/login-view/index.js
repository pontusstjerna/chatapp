import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Button, Form, Grid , Message, Divider} from 'semantic-ui-react'
import User from '../../model/User'
import { FormattedMessage  } from 'react-intl';
import { Format } from 'react-intl-format';

class LoginView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formError: false,
            nickname: '',
            password: '',
            fireRedirect: false,
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        const {nickname, password}  = this.state;
        User.login(nickname, password)
        .then(user => {
          this.setState({ fireRedirect: true });
        })
        .catch(err => {
            this.setState({formError: true});
        })
        event.preventDefault();
    }


    render() {
        return(
        <Format>
        {intl => (
            <div>
                <Grid centered columns={3}>
                <Grid.Column>
                    <h2>Login</h2>
                    <Form error={this.state.formError} onSubmit={this.handleLogin}>
                    <Form.Input
                        type="text"
                        placeholder={intl.formatMessage({id:'login.nickname'})}
                        value={this.state.nickname}
                        onChange={e => this.setState({nickname: e.target.value})}
                    />
                    <Form.Input
                        type="password"
                        placeholder={intl.formatMessage({id:'login.password'})}
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <Button type='submit'><FormattedMessage id = "login.send"/></Button>
                    <Message
                        error
                        header='Invalid stuffelistuff'
                        content={this.state.errorMsg}
                    />
                    </Form>
                    <Divider hidden />
                    <p>
                        <FormattedMessage id = "login.notAMember"/>
                        <a href="#/register"> <FormattedMessage id = "login.register"/> </a>
                        <FormattedMessage id = "login.instead"/>
                    </p>
                </Grid.Column>
                </Grid>
                {this.state.fireRedirect && (
                  <Redirect to={'/'}/>
                )}
        
            </div>
        )}
        </Format>
        );
    }
}

export default LoginView;
