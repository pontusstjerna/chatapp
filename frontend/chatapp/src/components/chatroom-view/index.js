import React, { Component } from 'react';

import ChatWindow from './components/chatwindow.js';

class ChatroomView extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <p>Public chat room</p>
                <ChatWindow room={this.props.name} />
            </div>
        );
    }
}

export default ChatroomView;