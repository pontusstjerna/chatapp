import React, { Component } from 'react';
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
                <h3>Create new room</h3>
                <hr />
                <input
                    className="input" 
                    type="text"
                    placeholder="Enter a room name"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                    />
                <input
                    className="input"
                    type="text"
                    placeholder="Enter a description"
                    value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})}
                    />
                <button onClick={() => this.addRoom()}>Add room </button>
            </div>
        )
    }
}

export default CreateRoomView;