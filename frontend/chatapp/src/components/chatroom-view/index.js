import React, { Component } from 'react';

import ChatWindow from './components/chatwindow.js';

class ChatroomView extends Component {
    render() {
        return (
            <div>
                <h2>{"#" + this.props.room.name.replace(/_/g, ' ')}</h2>
                <p>{this.props.room.description ? this.props.room.description : 'Public chat room'}</p>
                <ChatWindow room={this.props.room} />
            </div>
        );
    }
}

export default ChatroomView;