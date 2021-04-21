import React, { Component } from "react";
import { connect } from "react-redux";

import Logo from "../HowToSurvive.png";
import "./Register.css";

import * as actions from "../store/actions/index";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    phone: "",
    gender: "",
  };

  handleUsername = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  };

  handlePassword = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  handleEmail = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
  };

  handleFirstName = (event) => {
    this.setState({
      ...this.state,
      firstName: event.target.value,
    });
  };

  handlePhone = (event) => {
    this.setState({
      ...this.state,
      phone: event.target.value,
    });
  };

  handleGender = (event) => {
    this.setState({
      ...this.state,
      gender: event.target.value,
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register(
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.firstName,
      this.state.phone,
      this.state.gender
    );
  };

  render() {
    return (
      <div className="main">
        <form className="fields" onSubmit={this.handleRegister}>
          <img src={Logo} alt="logo" className="logo" />
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g testuser"
              onChange={this.handleUsername}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="e.g testuser"
              onChange={this.handlePassword}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="e.g test@test.com"
              onChange={this.handleEmail}
              required
            />
          </div>
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              placeholder="e.g Batuhan"
              onChange={this.handleFirstName}
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              type="text"
              placeholder="e.g 0534 168 6573"
              onChange={this.handlePhone}
              required
            />
          </div>
          <div className="field">
            <label>Gender</label>
            <input
              type="text"
              placeholder="e.g M/F"
              onChange={this.handleGender}
              required
            />
          </div>
          <div className="buttons">
            <button type="submit">Register</button>
            <button onClick={() => (window.location.href = "/login")}>
              Login
            </button>
          </div>
          {this.props.error != null ? (
            <div className="warning"> {this.props.error.data.data[0].msg + "!!!"}</div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapDispatchToState = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, password, email, firstName, phone, gender) =>
      dispatch(
        actions.register(username, password, email, firstName, phone, gender)
      ),
  };
};

export default connect(mapDispatchToState, mapDispatchToProps)(Register);
