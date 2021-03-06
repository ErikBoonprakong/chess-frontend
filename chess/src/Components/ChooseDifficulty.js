import React from "react";
import { Redirect } from "react-router-dom";
import Networking from "./Networking";

import "./Login.css";
import "./ChooseDifficulty.css";

class ChooseDifficulty extends React.Component {
  constructor(props) {
    super(props);
    // Each key in the state is given a truthy or falsy value - this whole state isn passed to PlatAI
    this.state = {
      reset: 0,
      undo: 0,
      inCheck: 0,
      optimalMove: 0,
      difficulty: 0,
      userColour: null,
      submit: 0,
    };
    this.Networking = new Networking();
  }

  async handleOptions(e) {
    const newState = this.state[e.target.id] ? 0 : 1;
    await this.setState({ [e.target.id]: newState });
  }
  handleSubmit(e) {
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
                fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", ///Passes down an initialised by default
              },
            }}
          />
        ) : (
          <div className="body-div">
            <h1 className="choose-difficulty">Choose difficulty</h1>
            <div className="create-account">
              <div className="login-form">
                <ul>
                  <ul className="difficulty-options">
                    <li>
                      <input
                        onClick={(e) => this.handleOptions(e)}
                        type="checkbox"
                        id="inCheck"
                        name="check_hint"
                      ></input>
                      <label htmlFor="undo">
                        Let me know when I am in check.
                      </label>
                    </li>
                    <li>
                      <input
                        onClick={(e) => this.handleOptions(e)}
                        type="checkbox"
                        id="undo"
                        name="undo"
                      ></input>
                      <label htmlFor="undo"> Let me undo my last move.</label>
                    </li>
                    <li>
                      <input
                        onClick={(e) => this.handleOptions(e)}
                        type="checkbox"
                        id="reset"
                        name="reset"
                      ></input>
                      <label htmlFor="reset"> Let me reset the board.</label>
                    </li>
                    <li>
                      <input
                        onClick={(e) => this.handleOptions(e)}
                        type="checkbox"
                        id="optimalMove"
                        name="optimalMove"
                      ></input>
                      <label htmlFor="optimalMove"> Show me hints.</label>
                    </li>
                  </ul>
                </ul>
              </div>
              <div id="buttonWrapper">
                <button
                  className="decision-btn"
                  id="submit"
                  name="easy"
                  value="0"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Easy!
                </button>
                <button
                  className="decision-btn"
                  id="submit"
                  name="medium"
                  value="1"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Medium!
                </button>
                <button
                  className="decision-btn"
                  id="submit"
                  name="hard"
                  value="2"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Hard!
                </button>
                <button
                  className="decision-btn"
                  id="submit"
                  name="really_hard"
                  value="3"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Really hard!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ChooseDifficulty;
