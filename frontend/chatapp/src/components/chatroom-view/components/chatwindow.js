import React, { Component } from 'react';
import '../../../styles/chatwindow.css';
import {
    send,
    socket,
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
        // registerRooms((room) => {
        //     console.log(msg);
        //     msg = JSON.parse(msg);
        //     let messages = this.state.messages;
        //     if (msg.room === this.props.room._id) {
        //         messages.push(msg);
        //         this.setState({messages: messages});
        //     }
        // });
        this.getOldMessages();
    }

    getOldMessages() {
        fetch(`http://${constants.backendURL}:${constants.restPort}/rooms/${this.props.room._id}/messages`, {
            method: 'GET',
        }).then(result =>
            result.json()
        ).then(result => this.setState({messages: result.messages}));
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

/*
*   Stateless component for displaying a message
*   props:  message= message Object
*/
const MessageItem = (props) => {

    return (
        <Comment>
            <Comment.Avatar src={require("./placeholder-img/matt.jpg")} />
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
