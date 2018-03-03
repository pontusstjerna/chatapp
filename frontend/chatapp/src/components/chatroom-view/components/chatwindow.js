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

//append a leading zero to strings with length of one
function singleDigitPrepend(data){
    if(data.toString().length == 1){
        data = "0" + data
    }
    return data
}

//reformats the timestamp to yyyy-mm-dd hh:mm:ss
function formatTimestamp(time){
    var dateObj = new Date(time);
    var y = dateObj.getFullYear();
    var m = singleDigitPrepend(dateObj.getMonth() + 1);
    var d = singleDigitPrepend(dateObj.getDay());

    var hour = singleDigitPrepend(dateObj.getHours());
    var min = singleDigitPrepend(dateObj.getMinutes());
    var sec = singleDigitPrepend(dateObj.getSeconds());

    return "Posted: " + y + "-" + m + "-" + d + " " + hour + ":" + min + ":" + sec;
}

//computes time since last post by using a timestamp
function lastPosted(time){
    //date when posted
    var oldDate = new Date(time);
    //current date
    var currDate = new Date();

    var diffYear = currDate.getFullYear() - oldDate.getFullYear();
    var diffMonth = currDate.getMonth() - oldDate.getMonth();
    var diffDay = currDate.getDay() - oldDate.getDay();

    //total seconds in date when posted
    var totalSec = oldDate.getTime() / 1000;
    //current total seconds in date
    var currentTotalSec = currDate.getTime() / 1000;
    //seconds between last and current post
    var diffSec = Math.abs(currentTotalSec - totalSec);

    //unit conversions using remaining seconds
    var h = Math.floor(diffSec / 3600);
    diffSec = diffSec % 3600;
    var m = Math.floor(diffSec / 60);
    diffSec = Math.floor(diffSec % 60);
    var s = diffSec
    diffSec = diffSec % 31556926;

    if(diffYear !== 0){
        return diffYear.toString() + " years ago"
    }
    else if(diffMonth !== 0){
        return diffMonth.toString() + " months ago"
    }
    else if(diffDay !== 0){
        return diffDay.toString() + " days ago";
    }
    else if(h !== 0){
        return h.toString() + " hours ago";
    }
    else if(m !== 0){
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
                    <div>{ formatTimestamp(props.item.time_stamp) }</div>
                </Comment.Metadata>

                <Comment.Metadata>
                    { lastPosted(props.item.time_stamp) }
                </Comment.Metadata>
                <Comment.Text>{ props.item.text }</Comment.Text>
            </Comment.Content>
        </Comment>
    );
}
