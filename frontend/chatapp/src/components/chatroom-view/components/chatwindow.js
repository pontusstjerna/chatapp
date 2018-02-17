import React, { Component } from 'react';

import '../../../styles/chatwindow.css';

class ChatWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: '',
            input: '',
            user: 'Anonymous'
        };
    }

    send() {
        console.log('Sent: ' + this.state.input);
        let msg = this.state.user + ': ' + this.state.input;
        this.setState({content: this.state.content + msg + '\n'});
        this.setState({input: ''});
        // TODO: Send for real
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="offset-md-1 col-md-10"> 
                        <textarea 
                            className="chat-content" 
                            rows="20"
                            readOnly
                            value={this.state.content}
                            />
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-1 col-md-8">
                        <textarea 
                            className="chat-input" 
                            value={this.state.input}
                            placeholder="Write a message... (what you type here won't actually be sent yet!)"
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
                    <button onClick={() => this.send()} className="col-md-1 btn-send">Send</button>
                </div>
            </div>
        );
    };
}

export default ChatWindow;