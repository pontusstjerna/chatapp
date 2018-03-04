import React, {Component} from 'react'
import { Button, Form, Grid , Message} from 'semantic-ui-react'

class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: 'Test',
      about: 'Test',
      email: "hello@example.com",
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Grid centered columns={3}>
          <Grid.Column>
            <h2>Settings</h2>
            <p>{this.state.email}</p>
            <Form onChange={this.handleSubmit}>
              <Form.Input
                label="Nickname"
                type="text"
                placeholder="Nickname"
                value={this.state.nickname}
                onChange={e => this.setState({nickname: e.target.value})}
              />
              <Form.Input
                label="About me"
                type="text"
                placeholder="About me"
                value={this.state.about}
                onChange={e => this.setState({about: e.target.value})}
              />
              <Form.Input
                label="Password"
                type="password"
                value={this.state.about}
                onChange={e => this.SetState({password: e.target.value})}
              />
              <Button type="submit">Save</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SettingsView;
