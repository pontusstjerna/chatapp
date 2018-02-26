import React, { Component } from 'react';
import '../../../styles/chatwindow.css';
import {
    send,
    registerListener,
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
        registerListener(msg => {
            console.log(JSON.stringify(msg));
            let messages = this.state.messages;
            messages.push(msg);
            this.setState({messages});
        });

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

    /*
        formatMessages() {
            return this.state.messages.map(({text, userId}) =>
            (userId ? userId : 'Anonymous') + ': ' + text).join('\n');
        }

        <img src={require("./placeholder-img/matt.jpg")} />
    */




    formatMessages() {
        return (
            <div>
                { this.state.messages.map((msg) => (<MessageItem message={msg}/>)) }
            </div>
        );
    }


    render() {
        return (
            <div className="ui segment">
                <div className="ui comments">

                    <MessageList messageArr={ this.state.messages }/>

                    <div>
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

                    </div>
                </div>
            );

        }
    }

    const MessageList = (props) => (
        <div>
            { props.messageArr.map((msg) => (<MessageItem key={ msg._id } message={ msg }/>)) }
        </div>
    )

    /*
    *   Stateless component for displaying a message
    *   props:  message= message Object
    */
    const MessageItem = (props) => (
        <Comment>
            <Comment.Avatar src={require("./placeholder-img/matt.jpg")} />
            <Comment.Content>
                <Comment.Author as='a'>{ props.message.user ? props.message.user : 'Anonymous' }</Comment.Author>
                <Comment.Metadata>
                    <div>{ props.message.time_stamp }</div>
                </Comment.Metadata>
                <Comment.Text>{ props.message.text }</Comment.Text>
            </Comment.Content>
        </Comment>
    )
