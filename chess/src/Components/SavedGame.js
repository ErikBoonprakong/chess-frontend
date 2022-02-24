import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import cookieObj from "./GetCookies";
import Alert from "react-bootstrap/Alert";
import { Chessboard } from "react-chessboard";

class SavedGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: cookieObj(),
    };
    this.networking = new Networking();
    this.cookies = cookieObj();
  }
  showDifficulty(rating) {
    switch (rating) {
      case "easy":
        return "easy";
      case 2:
        return "medium";
      case 3:
        return "hard";
      case 4:
        return "really hard";
      default:
        return "//";
    }
  }

  render() {
    console.log(this.props.options);
    return (
      <div className="previous-games">
        <div>
          <h5>{this.props.options.id}</h5>
          <h3>Last played: {this.props.options.created_at}</h3>
          <h2>
            Difficulty: {this.showDifficulty(this.props.options.difficulty)}
          </h2>
          <h4>Show hints: {this.props.options.hints ? "yes" : "no"}</h4>
          <h4>Reset board: {this.props.options.reset ? "yes" : "no"}</h4>
          <h4>Undo last move: {this.props.options.undo ? "yes" : "no"}</h4>
        </div>

        <Chessboard
          className="chessboard-snapshot"
          id="PlayVsRandom"
          boardOrientation={"white"}
          boardWidth={200}
          position={this.props.options.game_fen}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
          }}
        />
        <Link
          to={{
            pathname: "/playai",
            state: {
              state: this.props.options,
              fen: this.props.options.game_fen,
            },
          }}
        >
          <button id="play"> Play</button>
        </Link>
      </div>
    );
  }
}

export default SavedGame;
