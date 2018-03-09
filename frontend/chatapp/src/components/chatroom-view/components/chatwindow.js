import React, { Component } from 'react';
import '../../../styles/chatwindow.css';
import {
    send,
    getMessages,
    registerMessages,
    registerReceiveMsg,
} from '../../../data/socket';
import * as constants from '../../../data/constants';
import { Comment } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl';

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
                        <i className="icon edit"></i> <FormattedMessage id = "chatwindow.send"/>
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
    var d = singleDigitPrepend(dateObj.getDate());

    var hour = singleDigitPrepend(dateObj.getHours());
    var min = singleDigitPrepend(dateObj.getMinutes());
    var sec = singleDigitPrepend(dateObj.getSeconds());

    return "Posted: " + y + "-" + m + "-" + d + " " + hour + ":" + min + ":" + sec;
}

//computes time since last post by using a timestamp
function lastPosted(time){
    var ta = require('time-ago');
    return ta.ago(time);
}

/*
*   Stateless component for displaying a message
*   props:  message= message Object
*/
const MessageItem = (props) => {
    return (
        <Comment key={ props.item._id }>
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
