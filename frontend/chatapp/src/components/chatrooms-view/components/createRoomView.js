import React, { Component } from 'react';
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
                <h3><FormattedMessage id = "chatwindow.createNewRoom"/></h3>
                <hr />
                <input
                    className="input" 
                    type="text"
                    placeholder={intl.formatMessage({id:'chatwindow.input'})}
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                    />
                <input
                    className="input"
                    type="text"
                    placeholder={intl.formatMessage({id:'chatwindow.description'})}
                    value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})}
                    />
                <button onClick={() => this.addRoom()}><FormattedMessage id = "chatwindow.addRoom"/> </button>
            </div>
        )}
        </Format>
        )
    }
}



export default CreateRoomView;