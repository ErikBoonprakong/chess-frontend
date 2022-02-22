import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import cookieObj from "./GetCookies";
import Alert from "react-bootstrap/Alert";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      redirect: false,
      valid: true,
      cookies: cookieObj(),
    };
    this.Networking = new Networking();
  }

  handleChange = async (event) => {
    await this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await this.Networking.postLogin(
      this.state.username,
      this.state.password
    );

    this.setState({ cookies: cookieObj() });

    
    this.props.newCookie(this.state.cookies);
    if (this.state.cookies.user) {

      this.setState({ redirect: true, valid: true });
    } else {
      this.setState({ valid: false, error: response.message });
    }
  };

  getWarning(input) {
    return <Alert variant="danger">{this.state.error}</Alert>;
  }

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/home" />
        ) : (
          <div className="login-form">
            <h2>Login</h2>{" "}
            <form onSubmit={this.handleSubmit}>
              <label>Username </label>
              <input
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              ></input>
              <br />
              <br />
              <label>Password </label>
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
              <br />
              <br />

              <div className="buttons">
                <input
                  className="login-btn"
                  type="submit"
                  value="Login"
                ></input>
                <Link to="/register">
                  <button className="register-btn">Create Account</button>
                </Link>
                <h4 className="error-message">
                  {" "}
                  {!this.state.valid && this.getWarning()}
                </h4>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default LogIn;
