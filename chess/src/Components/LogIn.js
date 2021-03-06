import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import cookieObj from "./GetCookies";
import Alert from "react-bootstrap/Alert";
import "./Login.css";

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

    // Page only redirects to home page if cookies contains a user.

    if (this.state.cookies.user) {
      this.setState({ redirect: true, valid: true });
    } else {
      // Error messages are set in the backend, retrieved from login post request.
      this.setState({ valid: false, error: response.message });
    }
  };

  getWarning(input) {
    return <Alert variant="danger">{this.state.error}</Alert>;
  }

  //Use conditional rendering and Redirect from React Router Dom to render the Login Page.
  render() {
    return (
      <div className="log-form">
        {this.state.redirect ? (
          <Redirect to="/home" />
        ) : (
          <div className="login-form">
            <h2>Login</h2>{" "}
            <form onSubmit={this.handleSubmit} data-testid="form">
              <div id="inputWithIcon">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="user"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div id="inputWithIcon">
                <input
                  name="password"
                  data-testid="password"
                  placeholder="Password"
                  type={this.state.showPassword ? "text" : "password"}
                  className="user"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <br />

              <div className="buttons">
                <input
                  className="login-btn-register-btn"
                  type="submit"
                  value="Login"
                ></input>
                {/* React Router Link to Create Account component if user does not have an account */}
                <Link to="/register">
                  <button data-testid="register-btn" className="register-btn">
                    Create Account
                  </button>
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
