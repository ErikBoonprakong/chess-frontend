import React from "react";
import { Link, Redirect } from "react-router-dom";
import Networking from "./Networking";
import Alert from "react-bootstrap/Alert";
import cookieObj from "./GetCookies";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      username: "",
      password: "",
      confirm: "",
      error: "",
      valid: true,
      redirect: false,
      cookies: cookieObj(),
    };
    this.Networking = new Networking();
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { json, status } = await this.Networking.postUser(
      this.state.username,
      this.state.password,
      this.state.confirm
    );
    if (status === 200) {
      //Redirects to login page if the user has created an account correctly.
      this.setState({ valid: true, redirect: true });
      this.props.newCookie(this.state.cookies);
    } else if (status === 400) {
      //Retrieves error message from json if post request has return a 400 Bad Response.
      this.setState({
        valid: false,
        error: json.message,
      });
    }
  }

  showPassword(e) {
    //If the state of showPassword is true, the input type in the render function is changed from password to text with a ternary operator.
    this.setState({ showPassword: !this.state.showPassword });
  }

  getWarning(input) {
    //Bootstrap Alert message contains error message from json, from the postUser request.
    return <Alert variant="danger">{this.state.error}</Alert>;
  }

  render() {
    return (
      <div className="body-div">
        <Link to="/login">
          <button className="register-btn">Back to Login!</button>
        </Link>
        <div className="create-account">
          {this.state.redirect ? (
            <Redirect to="/login" />
          ) : (
            <div className="login-form">
              <h2>Create Account!</h2>
              <form
                className="createAccountForm"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <div id="inputWithIcon">
                  <input
                    type="text"
                    placeholder="Username"
                    className="user"
                    id="username"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div id="inputWithIcon">
                  <input
                    placeholder="Password"
                    type={this.state.showPassword ? "text" : "password"}
                    className="user"
                    id="password"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div id="inputWithIcon">
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder="Confirm"
                    className="user"
                    id="confirm"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <br />
                <label className="password-label">Show Password </label>
                <input
                  data-testid="unchecked"
                  className="check"
                  type="checkbox"
                  onChange={this.showPassword.bind(this)}
                ></input>
                <br />
                <br />
                <div className="buttons">
                  <input
                    type="submit"
                    data-testid="register-input"
                    className="login-btn-register-button"
                    id="submit"
                  />
                  <h4>{!this.state.valid && this.getWarning()}</h4>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateAccount;
