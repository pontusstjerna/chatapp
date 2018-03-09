import React, {Component} from 'react'
import {
  Button,
  Form,
  Grid
} from 'semantic-ui-react'
import User from '../../model/User';
import { FormattedMessage  } from 'react-intl';
import { Format } from 'react-intl-format';

class SettingsView extends Component {
  constructor(props) {
    super(props);
    if (User.isLoggedIn()) {
      this.state = {
        nickname: User.getNickname(),
        about: User.getUserAbout(),
        email: User.getUserEmail(),
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let user = {
      email: this.state.email,
      nickname: this.state.nickname,
      about: this.state.about
    };
    User.updateSettings(user).then(() => {
        console.log("Settings updated");
        this.setState({
            nickname: User.getNickname(),
            about: User.getUserAbout(),
            email: User.getUserEmail()
        });
        alert('Successfully updated user settings!');
    });
    event.preventDefault();
  }

  render() {
    if (User.isLoggedIn()) {
      return (
        <Format>
        {intl => (
        <div>
          <Grid centered columns={3}>
            <Grid.Column>
              <h2><FormattedMessage id = "settings.settings"/></h2>
              <p>{this.state.email}</p>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  label="Nickname"
                  type="text"
                  placeholder={intl.formatMessage({id:'settings.nickname'})}
                  value={this.state.nickname}
                  onChange={e => this.setState({nickname: e.target.value})}
                />
                <Form.Input
                  label="About me"
                  type="text"
                  placeholder={intl.formatMessage({id:'settings.about'})}
                  value={this.state.about}
                  onChange={e => this.setState({about: e.target.value})}
                />
                <Button type="submit"><FormattedMessage id = "settings.save"/></Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
        )}
        </Format>
      )
    } else {
      return (
        <h2>You are not authorized to see this page</h2>
      )
    }
  }
}

export default SettingsView;
