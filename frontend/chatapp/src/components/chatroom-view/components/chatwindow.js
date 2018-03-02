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
            this.setState({messages: messages});
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

//reformats the timestamp
function formatTimestamp(time){
    //TODO: make the timestamp look better
}

//computes time last posted by using a timestamp
function lastPosted(time){
    //current date
    var date = new Date();

    //total seconds in date when posted
    var totalSec = date.getTime() / 1000;
    //current total seconds in date
    var currentTotalSec = new Date(time).getTime() / 1000;
    //seconds between last and current post
    var diffSec = Math.abs(currentTotalSec - totalSec);

    //TODO: add month
    var d = Math.floor(diffSec / 86400);
    diffSec = diffSec % 86400;
    var h = Math.floor(diffSec / 3600);
    diffSec = diffSec % 3600;
    var m = Math.floor(diffSec / 60);
    diffSec = Math.floor(diffSec % 60);
    var s = diffSec
    diffSec = diffSec % 31556926;

    if(d!=0){
        return d.toString() + " days ago";
    }

    else if(h!=0){
        return h.toString() + " hours ago";
    }

    else if(m!=0){
        return m.toString() + " minutes ago";
    }

    else{
        return s + " seconds ago";
    }
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

                <Comment.Metadata>
                    { lastPosted(props.item.time_stamp) }
                </Comment.Metadata>
                <Comment.Text>{ props.item.text }</Comment.Text>
            </Comment.Content>
        </Comment>
    );
}
