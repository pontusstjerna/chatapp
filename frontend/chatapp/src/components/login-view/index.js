import React, { Component } from 'react';
import { Button, Form, Grid , Message, Divider} from 'semantic-ui-react'
import User from '../../model/User'

class LoginView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formError: false,
            nickname: '',
            password: '',
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        const {nickname, password}  = this.state;
        User.login(nickname, password)
        .catch(err => {
            this.setState({formError: true});
        })
        event.preventDefault();
    }


    render() {
        return(
            <div>
                <Grid centered columns={3}>
                <Grid.Column>
                    <h2>Login</h2>
                    <Form error={this.state.formError} onSubmit={this.handleLogin}>
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
                    <Button type='submit'>Login</Button>
                    <Message
                        error
                        header='Invalid stuffelistuff'
                        content={this.state.errorMsg}
                    />
                    </Form>
                    <Divider hidden />
                    <p>Not a member? <a href="#/register">Register</a> instead</p>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default LoginView;
