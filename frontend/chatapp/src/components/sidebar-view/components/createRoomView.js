import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react'
import {
    createRoom,
} from '../../../data/socket';

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
            <div className="input-container">
              <Grid columns={3}>
                <Grid.Column>
                <h3>Create new room</h3>
                <Form onSubmit={() => this.addRoom()}>
                  <Form.Input
                      className="input"
                      type="text"
                      placeholder="Enter a room name"
                      value={this.state.name}
                      onChange={e => this.setState({name: e.target.value})}
                      />
                  <Form.Input
                      className="input"
                      type="text"
                      placeholder="Enter a description"
                      value={this.state.description}
                      onChange={e => this.setState({description: e.target.value})}
                      />
                  <Button type="submit">Add room</Button>
                </Form>
                </Grid.Column>
              </Grid>
            </div>
        )
    }
}

export default CreateRoomView;
