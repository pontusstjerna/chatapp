import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react'
import {
    createRoom,
} from '../../../data/socket';
import { FormattedMessage  } from 'react-intl';
import { Format } from 'react-intl-format';


class CreateRoomView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
        }
    }

    addRoom() {
        const { name, description } = this.state;
        createRoom({
            name: name.replace(/ /g, '_'),
            description,
        });
    }

    render() {
        return (
		<Format>
        {intl => (
            <div className="input-container">

              <Grid columns={3}>
                <Grid.Column>
                <h3><FormattedMessage id = "chatwindow.createNewRoom"/></h3>
                <Form onSubmit={() => this.addRoom()}>
                  <Form.Input
                      className="input"
                      type="text"
                      placeholder={intl.formatMessage({id:'chatwindow.roomName'})}
                      value={this.state.name}
                      onChange={e => this.setState({name: e.target.value})}
                      />
                  <Form.Input
                      className="input"
                      type="text"
                      placeholder={intl.formatMessage({id:'chatwindow.description'})}
                      value={this.state.description}
                      onChange={e => this.setState({description: e.target.value})}
                      />
                  <Button type="submit"><FormattedMessage id = "chatwindow.addRoom"/></Button>
                </Form>
                </Grid.Column>
              </Grid>
            </div>
        )}
        </Format>
        )
    }
}



export default CreateRoomView;
=======
export default CreateRoomView;
>>>>>>> f96e0b0abe0be15f9eed3fcab53c3a436b033d4b
