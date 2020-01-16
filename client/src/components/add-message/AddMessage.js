import React, {Component} from "react";
import {connect} from "react-redux";
import "./AddMessage.css";
import {sendMessage} from "../../store/actions/chat";
import withSocket from "../hoc/withSocket";

class AddMessage extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.props.socket.addHandler('SendMessage', (res) => {
      this.props.sendMessage(res.payload)
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.socket.send(JSON.stringify({
      type: 'SendMessage',
      data: {
        text: this.inputRef.current.value
      }
    }));
    this.inputRef.current.value = ''
  };

  render() {
    return (
      <div className="add-message">
        <form className="add-message-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder='Start typing...'
            className="add-message__input"
            ref={this.inputRef}
          />
          <button type="submit" className="add-message__btn">Send</button>
        </form>
      </div>
    )
  }
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(withSocket()(AddMessage));
