import React, {Component, createRef} from "react";
import {connect} from 'react-redux';
import "./login.css";
import {addChatUser, setUser, addChatUsers} from "../../store/actions/chat";
import withSocket from "../../components/hoc/withSocket";

class Login extends Component {
  constructor(props) {
    super(props);
    this.userRef = createRef();

    this.props.socket.addHandler('Login', (res) => {
      this.props.setUser(res.payload);
      this.props.history.push('/chat');
    });

    this.props.socket.addHandler('NewUser', (res) => {
      this.props.addChatUser(res.payload);
    });

    this.props.socket.addHandler('GetUserList', (res) => {
      this.props.addChatUsers(res.payload.users);
    });

    this.props.socket.addError(() => {
      this.errorHandler()
    });

    this.props.socket.setReconnect(() => {
      if (this.props.user) {
        this.login(this.props.user.name);
      }
    })
  }

  state = {
    error: false
  };

  login = (userName) => {
    const user = {
      type: 'Login',
      data: {
        name: userName || "Guest"
      }
    };
    this.props.socket.send(JSON.stringify(user));
  };

  onLogin = (event) => {
    event.preventDefault();
    this.login(this.userRef.current.value)
  };

  errorHandler = () => {
    this.setState({
      error: true
    });
  };

  render() {
    const errorMess = this.state.error ? <div className="error-message">Отсутствует подключение к серверу</div> : null
    return (
      <div className="login">
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.onLogin}>
          <input
            type="text"
            className="login-form__input"
            ref={this.userRef}
            placeholder='Enter your name'
          />
          <button type="submit" className="login-form__btn">Login</button>
        </form>
        {errorMess}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.chat.user
});

const mapDispatchToProps = {
  setUser,
  addChatUsers,
  addChatUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withSocket()(Login));
