import React from "react";
import { Link, Redirect } from "react-router-dom";
import Networking from "./Networking";

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
      this.setState({ valid: true, redirect: true });
    } else if (status === 400) {
      this.setState({
        valid: false,
        error: json.message,
      });
    }
  }

  showPassword(e) {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    return (
      <div className="body-div">
        <Link to="/login">
          <button className="register-btn">Back to Login!</button>
        </Link>
        <div className="create-account">
          {/* {this.state.redirect ? (
            <Redirect to="/search" />
          ) : ( */}
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
                className="check"
                type="checkbox"
                onChange={this.showPassword.bind(this)}
              ></input>
              <br />
              <br />
              <div className="buttons">
                <input type="submit" className="login-btn" id="submit" />
                {!this.state.valid && this.getWarning()}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
