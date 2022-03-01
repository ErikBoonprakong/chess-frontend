import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import cookieObj from "./GetCookies";
import Alert from "react-bootstrap/Alert";
import { Chessboard } from "react-chessboard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

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
      case 0:
        return " easy";
      case 1:
        return " medium";
      case 2:
        return " hard";
      case 3:
        return " really hard";
      default:
        return "//";
    }
  }

  render() {
    console.log(this.props.options.difficulty);
    return (
      <div className="previous-games">
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
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
          </ListItemAvatar>
          <ListItemText
            primary={`Difficulty:
            ${this.showDifficulty(this.props.options.difficulty)}`}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {/* {" — I'll be in your neighborhood doing errands this…"} */}
                <h4>Last played: {this.props.options.created_at}</h4>
                <h4>Show hints: {this.props.options.hints ? "yes" : "no"}</h4>
                <h4>Reset board: {this.props.options.reset ? "yes" : "no"}</h4>
                <h4>
                  Undo last move: {this.props.options.undo ? "yes" : "no"}
                </h4>
              </React.Fragment>
            }
          />
        </ListItem>
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
        <Divider variant="inset" />
      </div>
    );
  }
}

export default SavedGame;
