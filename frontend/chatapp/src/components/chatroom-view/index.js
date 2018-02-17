import React, { Component } from 'react';

class ChatroomView extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <p>Public chat room</p>
                
            </div>
        );
    }
}

export default ChatroomView;