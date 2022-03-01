import React from "react";
import io from "socket.io-client";
import { Chessboard } from "react-chessboard";
import * as Chess from "chess.js";
import cookieObj from "./GetCookies";
import Networking from "./Networking";
import theme from "./Theme.js";
import { CircularProgress, ThemeProvider } from "@mui/material";
import "./play.css";
class PlayOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      messageList: [],
      game: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      checkMate: "",
      CurrentTimeout: undefined,
      endOfGame: false,
      playerMessage: "",
      playerError: "",
      players: [],
      moveCounter: 0,
    };
    this.currentUser = cookieObj();
    this.networking = new Networking();
    this.players = [];
  }

  componentDidMount() {
    this.socket = io("https://chessyem-websocket.herokuapp.com");
    this.socket.on("new message", (msg) => {
      this.setState({ messageList: [...this.state.messageList, msg] });
    });
    this.socket.emit("join room", this.props.userData.user);
    this.socket.on("new move", (move) => {
      const moveIncrement = this.state.moveCounter + 1;
      this.setState({ game: move, moveCounter: moveIncrement });
    });

    this.socket.on("player list", (playerList) => {
      this.setState({
        players: playerList,
      });
    });
    this.socket.on("leave room", (playerList) => {
      this.setState({ players: playerList, white: "", black: "" });
    });

    this.setState({
      white: this.state.players[0],
      black: this.state.players[1],
    });
  }

  componentWillUnmount() {
    this.socket.emit("leave room", this.props.userData.user);
    this.socket.emit(
      "new move",
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    this.setState({
      game: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      messageList: [],
      white: "",
      black: "",
    });
  }

  displayMessages() {
    const messageList = this.state.messageList.map((msg, i) => (
      <div key={i}>{msg}</div>
    ));
    return messageList;
  }

  getOpponentName() {
    let opponentName = "";
    if (this.state.players[0] === this.props.userData.user) {
      opponentName = this.state.players[1];
    } else {
      opponentName = this.state.players[0];
    }
    return opponentName;
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ chatMessage: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    let messageString =
      this.props.userData.user + ": " + this.state.chatMessage;
    this.socket.emit("new message", messageString);
    this.setState({ chatMessage: "" });
  }

  async onDrop(sourceSquare, targetSquare) {
    if (
      !this.state.endOfGame &&
      this.props.userData.user ===
        this.state.players[this.state.moveCounter % 2] &&
      this.state.players.length === 2
    ) {
      const newGame = new Chess(this.state.game);
      const gameCopy = { ...newGame };
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      if (move === null) return false;
      const newGameFen = gameCopy.fen();

      this.socket.emit("new move", newGameFen);
      // const moveIncrement = this.state.moveCounter + 1;
      this.setState({ game: newGameFen });

      if (!this.state.endOfGame && gameCopy.in_checkmate()) {
        let opponentName = this.getOpponentName();
        this.setState({ endOfGame: true });
        await this.sendResults(this.props.userData.user, 1, 0, 0);
        await this.sendResults(opponentName, 0, 1, 0);
        this.socket.emit("new message", `${this.props.userData.user} Wins`);
      }
      if (
        !this.endOfGame &&
        (gameCopy.in_draw() ||
          gameCopy.in_stalemate() ||
          gameCopy.in_threefold_repetition())
      ) {
        this.setState({ endOfGame: true });
        await this.sendResults(this.state.players[0], 0, 0, 1);
        await this.sendResults(this.state.players[1], 0, 0, 1);

        this.socket.emit("new message", "Draw");
      }
    } else {
      if (
        this.props.userData.user !==
        this.state.players[this.state.moveCounter % 2]
      ) {
        console.log("not your turn");
        this.setState({
          playerMessage: "It is not your turn.",
          playerError: true,
        });
      }
      return false;
    }
  }

  async sendResults(name, won, lost, draw) {
    const response = await this.networking.postResult(name, won, lost, draw);

    return response;
  }
  displayPlayers() {
    if (this.state.players.length === 2) {
      return (
        <div className="play">
          <div>{`${this.state.players[0]} plays white, ${this.state.players[1]} plays black. `}</div>

          <Chessboard
            id="PlayVsPlay"
            boardOrientation={
              this.state.players[0] === this.props.userData.user
                ? "white"
                : "black"
            }
            animationDuration={200}
            boardWidth={400}
            position={this.state.game}
            onPieceDrop={this.onDrop.bind(this)}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
      );
    } else if (this.state.players.length < 2) {
      return (
        <div>
          {" "}
          <ThemeProvider theme={theme}>
            <div className="graphs" style={{ marginTop: "30vh" }}>
              <CircularProgress size={100} />
            </div>
          </ThemeProvider>
          <div>Waiting for an opponent...</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="chat">
          <form onSubmit={(e) => this.sendMessage(e)}>
            <input
              type="textarea"
              onChange={(e) => this.handleChange(e)}
              value={this.state.chatMessage}
            />
            <input type="submit" value="Send Message" />
          </form>
          <div className="messageDisplay">{this.displayMessages()}</div>
        </div>

        {this.displayPlayers()}
      </div>
    );
  }
}

export default PlayOnline;
