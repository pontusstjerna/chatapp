import React, { Component } from 'react';
import { getUserInfo } from '../../data/socket';
import "../../styles/modal.css";

class UserView extends Component {

    constructor(props) {
      super(props);

      this.state = {
          userInfo: undefined,
      }
    }

    componentDidMount() {
        getUserInfo(this.props.user.item._id).then(userInfo => {
          this.setState({userInfo});
        });
    }

    render() {
      const { user, onClose, generateIcon, } = this.props;
      const { userInfo } = this.state;

      if (!userInfo) {
          return null;
      }

      return (
        <div className="modal">
          <div className="modal-content">
              <div id="modal-close">
                <span onClick={onClose} className="close">&times;</span>
              </div>
              <img src={generateIcon(user.item._id)} />
              <h1 id="modal-header">{user.item.nickname}</h1>
              <p>{userInfo.about}</p>
          </div>
        </div>
      )
    }

}

export default UserView;
