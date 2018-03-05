import React, { Component } from 'react';
import Identicon from 'identicon.js';
import '../../../styles/chatwindow.css';
import {
    send,
    getMessages,
    registerMessages,
    registerReceiveMsg,
} from '../../../data/socket';
import * as constants from '../../../data/constants';

import { Comment } from 'semantic-ui-react'

export default class ChatWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            input: '',
            user: null,
        };
    }

    componentDidMount() {
        registerMessages(messages => {
            this.setState({messages: messages.messages});
        });

        registerReceiveMsg(message => {
            let messages = this.state.messages;
            messages.push(message);
            this.setState({messages});
        })

        getMessages(this.props.room._id);
    }

    send() {
        console.log('Sent: ' + this.state.input);
        this.setState({input: ''});

        // This is our "oo-model"
        send({
            text: this.state.input,
            user: this.state.user,
            room: this.props.room._id,
        });
    }

    render() {
        return (
            <div className="ui segment">
                
                <MessageList messageArr={ this.state.messages }/>

                <form className="ui reply form">
                    <div className="field">
                        <textarea
                            className="chat-input"
                            value={this.state.input}
                            placeholder="Write a message... "
                            autoFocus
                            onChange={e => {
                                if (e.target.value !== '\n') {
                                    this.setState({input: e.target.value});
                                }
                            }}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    this.send();
                                }
                            }}
                            />
                    </div>
                    <div className="ui blue labeled submit icon button" onClick={() => this.send()}>
                        <i className="icon edit"></i> Send
                    </div>
                </form>
            </div>
        );
    }

}

const MessageList = (props) => {
    return (
        <div className="ui scroll">
            <div className="ui comments">
                { props.messageArr.map((msg) => <MessageItem key={ msg._id } item={ msg }/>) }
            </div>
        </div>
    );
}

function generateIcon(user) {
    let hashFromUser = user? user._id : 'oiaw590uif0u934598uerue489tiuh';
    return `data:image/png;base64,${new Identicon(hashFromUser)}`;
}

/*
*   Stateless component for displaying a message
*   props:  message= message Object
*/
const MessageItem = (props) => {

    return (
        <Comment key={ props.item._id }>
            <Comment.Avatar src={generateIcon(props.item.user)} />
            <Comment.Content>
                <Comment.Author as='a'>{ props.item.user ? props.item.user : 'Anonymous' }</Comment.Author>
                <Comment.Metadata>
                    <div>{ props.item.time_stamp }</div>
                </Comment.Metadata>
                <Comment.Text>{ props.item.text }</Comment.Text>
            </Comment.Content>
        </Comment>
    );
}
