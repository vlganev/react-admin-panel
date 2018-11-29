import React, { Component } from 'react';
import { connect } from 'react-redux';
// import logo from '../image/-logo.png'
import {Redirect} from 'react-router-dom';
import { Button, Label, InputGroup } from "@blueprintjs/core";
import { isLoggedIn, login } from '../../actions/login';
import { Row } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  componentWillUpdate() {
    this.props.isLoggedIn();
  }

  render() {
    let {isLoginSuccess, loginError} = this.props;
    let { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    if (isLoginSuccess) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div className="container-login">
        <Row justify="center">
            <div className="login">
              <h2>Добре дошли в Admin panel</h2>
              <article>
                <div className="error-message text-center">{ loginError && <div>{loginError.message}</div> }</div>
                <form onSubmit={this.onSubmit}>
                  <Label
                    className="h2"
                    text="Потребителско име"
                  >
                    <InputGroup 
                      className="bp3-large" 
                      type="text" 
                      name="username" 
                      id="username"
                      ref="username" 
                      placeholder="Потребителско име" 
                      dir="auto"
                      onChange={event => this.setState({username: event.target.value}) }
                      value={this.state.username}
                    />
                  </Label>
                  <Label
                    text="Парола"
                  >
                    <InputGroup 
                      className="bp3-large" 
                      type="password" 
                      name="password" 
                      id="password" 
                      ref="password"
                      placeholder="Парола" 
                      dir="auto"
                      onChange={event => this.setState({ password: event.target.value })}
                      value={this.state.password}
                    />
                  </Label>
                  <Button 
                    className="bp3-button bp3-fill"
                    icon="log-in" 
                    type="submit"
                    text="Вход"
                  />
                </form>
              </article>
            </div>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.login.isLoginPending,
    isLoginSuccess: state.login.isLoginSuccess,
    loginError: state.login.loginError,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    login: (username, password) => dispatch(login(username, password)),
    isLoggedIn: () => dispatch(isLoggedIn())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);