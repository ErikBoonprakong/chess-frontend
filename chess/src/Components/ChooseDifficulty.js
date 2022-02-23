import React from "react";
import { Link, Redirect } from "react-router-dom";
import Networking from "./Networking";
import Alert from "react-bootstrap/Alert";

class ChooseDifficulty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: false,
      undo: false,
      inCheck: false,
      submit: false,
    };
    this.Networking = new Networking();
  }

  async handleOptions(e) {
    const newState = this.state[e.target.id] ? false : true;
    await this.setState({ [e.target.id]: newState });
  }

  render() {
    return (
      <div>
        {this.state.submit ? (
          //   <Redirect to="/playai" />
          <Redirect
            to={{
              pathname: "/playai",
              state: {
                state: this.state,
              },
            }}
          />
        ) : (
          <div className="body-div">
            <Link to="/home">
              <button className="register-btn">Back to home</button>
            </Link>
            <div className="create-account">
              <div className="login-form">
                <h2>Choose difficulty</h2>
                <input
                  onClick={(e) => this.handleOptions(e)}
                  type="checkbox"
                  id="inCheck"
                  name="check_hint"
                ></input>
                <label htmlFor="vehicle1"> Let me know when im in check.</label>
                <input
                  onClick={(e) => this.handleOptions(e)}
                  type="checkbox"
                  id="undo"
                  name="undo"
                ></input>
                <label htmlFor="vehicle2"> Let me undo my last move.</label>
                <input
                  onClick={(e) => this.handleOptions(e)}
                  type="checkbox"
                  id="reset"
                  name="reset"
                ></input>
                <label htmlFor="vehicle3"> Let me reset the board.</label>
              </div>
              <button id="submit" onClick={(e) => this.handleOptions(e)}>
                Play!
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ChooseDifficulty;
