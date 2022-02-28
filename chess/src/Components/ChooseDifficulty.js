import React from "react";
import { Link, Redirect } from "react-router-dom";
import Networking from "./Networking";
import Alert from "react-bootstrap/Alert";

class ChooseDifficulty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: 0,
      undo: 0,
      inCheck: 0,

      optimalMove: 0,
      difficulty: 0,
      submit: 0,
    };
    this.Networking = new Networking();
  }

  async handleOptions(e) {
    const newState = this.state[e.target.id] ? 0 : 1;
    await this.setState({ [e.target.id]: newState });
  }
  handleSubmit(e) {
    console.log(e.target.value);
    this.setState({ difficulty: e.target.value, submit: true });
  }
  render() {
    return (
      <div>
        {this.state.submit ? (
          <Redirect
            to={{
              pathname: "/playai",
              state: {
                state: this.state,
                fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
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
                <label htmlFor="undo"> Let me know when im in check.</label>
                <input
                  onClick={(e) => this.handleOptions(e)}
                  type="checkbox"
                  id="undo"
                  name="undo"
                ></input>
                <label htmlFor="undo"> Let me undo my last move.</label>
                <input
                  onClick={(e) => this.handleOptions(e)}
                  type="checkbox"
                  id="reset"
                  name="reset"
                ></input>
                <label htmlFor="reset"> Let me reset the board.</label>

                <input
                  onClick={(e) => this.handleOptions(e)}
                  type="checkbox"
                  id="optimalMove"
                  name="optimalMove"
                ></input>
                <label htmlFor="optimalMove"> Show me hints.</label>
              </div>
              <button
                id="submit"
                name="easy"
                value="0"
                onClick={(e) => this.handleSubmit(e)}
              >
                Easy!
              </button>
              <button
                id="submit"
                name="medium"
                value="2"
                onClick={(e) => this.handleSubmit(e)}
              >
                Medium!
              </button>
              <button
                id="submit"
                name="hard"
                value="3"
                onClick={(e) => this.handleSubmit(e)}
              >
                Hard!
              </button>
              <button
                id="submit"
                name="really_hard"
                value="4"
                onClick={(e) => this.handleSubmit(e)}
              >
                Really hard!
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ChooseDifficulty;
