import React from "react";
import io from "socket.io-client";
import { Chessboard } from "react-chessboard";
import * as Chess from "chess.js";
import cookieObj from "./GetCookies";
import Networking from "./Networking";
import theme from "./Theme.js";
import { CircularProgress, ThemeProvider } from "@mui/material";
import "./play.css";
import immer from "immer";
import { Redirect } from "react-router-dom";

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
      room: "lobby",
      // username: this.props.userData.user,
      // connected: false,
      // currentChat: { chatName: "lobby", receiverId: "" },
      // connectedRooms: "lobby",
      // allUsers: [],
      // messages: "",
      // message: "",
    };
    this.socketRef = React.createRef();
    this.currentUser = cookieObj();
    this.networking = new Networking();
    this.players = [];
  }

  componentDidMount() {
    // Socket.IO API means you can emit events and register listeners on the server and client side.
    this.socket = io("https://chessyem-websocket.herokuapp.com");
    // console.log(this.props.location.state.roomNumber);
    // this.socket = io("http://localhost:4000");
    // LISTENER
    this.socket.on("new message", (msg) => {
      this.setState({ messageList: [...this.state.messageList, msg] });
    });
    // EMIT EVENT
    this.socket.emit(
      "enter room",
      this.props.userData.user,
      this.props.location.state.roomNumber
    );
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
    this.socket.emit(
      "leave room",
      this.props.userData.user,
      this.props.location.state.roomNumber
    );
    this.socket.emit(
      "new move",
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      this.props.location.state.roomNumber
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
    e.preventDefault(); //Do we need this?
    this.setState({ chatMessage: e.target.value });
  }

  sendMessage(e) {
    // Called on the event to prevent a browser refresh message is sent.
    e.preventDefault();
    let messageString =
      this.props.userData.user + ": " + this.state.chatMessage;
    this.socket.emit(
      "new message",
      messageString,
      this.props.location.state.roomNumber
    );
    this.setState({ chatMessage: "" });
  }

  async onDrop(sourceSquare, targetSquare) {
    if (
      !this.state.endOfGame &&
      this.props.userData.user ===
        this.state.players[this.state.moveCounter % 2] &&
      this.state.players.length >= 2
    ) {
      const newGame = new Chess(this.state.game);
      const gameCopy = { ...newGame };
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // Always promote to a queen for simplicity
      });

      if (move === null) return false;
      const newGameFen = gameCopy.fen();

      //Client sends the new state of the chessboard to the server so that second client can receive new board.
      this.socket.emit(
        "new move",
        newGameFen,
        this.props.location.state.roomNumber
      );
      // const moveIncrement = this.state.moveCounter + 1;
      this.setState({ game: newGameFen });

      if (!this.state.endOfGame && gameCopy.in_checkmate()) {
        let opponentName = this.getOpponentName();
        this.setState({ endOfGame: true });
        await this.sendResults(this.props.userData.user, 1, 0, 0);
        await this.sendResults(opponentName, 0, 1, 0);
        // Communicates with the server to display who has won after the endOfGame state becomes true.
        this.socket.emit(
          "new message",
          `${this.props.userData.user} Wins`,
          this.props.location.state.roomNumber
        );
      }
      if (
        !this.endOfGame &&
        (gameCopy.in_draw() ||
          gameCopy.in_stalemate() ||
          gameCopy.in_threefold_repetition())
      ) {
        this.setState({ endOfGame: true });

        //Sends results sends post request with details about match results to be added to the leaderboard.
        await this.sendResults(this.state.players[0], 0, 0, 1);
        await this.sendResults(this.state.players[1], 0, 0, 1);

        this.socket.emit(
          "new message",
          "Draw",
          this.props.location.state.roomNumber
        );
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

  selectRoom(e) {
    this.setState({ room: e.target.id });
  }

  displayPlayers() {
    if (this.state.players.length >= 2) {
      this.props.disableRoom(this.props.location.state.roomName);
      if (this.state.players.length > 2) {
        <Redirect to="/chooseroom" />;
      }
      return (
        <div className="play">
          <div>{`${this.state.players[0]} plays white, ${this.state.players[1]} plays black. `}</div>
          {/* Renders the chessboard if there are 2 players in the room. */}
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
      this.props.enableRoom(this.props.location.state.roomName);
      return (
        // Loading screen is rendered if the required amount of players are not in the room.
        <div className="loading">
          {" "}
          <ThemeProvider id="loading" theme={theme}>
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
      <div className="game-chat full-page">
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
