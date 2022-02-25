import React from "react";
import io from "socket.io-client";
import { Chessboard } from "react-chessboard";
import * as Chess from "chess.js";
import cookieObj from "./GetCookies";
import Networking from "./Networking";

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
      message: "",
      players: [],
    };
    this.currentUser = cookieObj();
    this.networking = new Networking();
    this.players = [];
  }

  componentDidMount() {
    this.socket = io("http://localhost:4000");
    this.socket.on("new message", (msg) => {
      this.setState({ messageList: [...this.state.messageList, msg] });
    });
    this.socket.emit("join room", this.props.userData.user);
    this.socket.on("new move", (move) => {
      this.setState({ game: move });
    });
    this.socket.on("player list", (playerList) => {
      this.setState({ players: playerList });
    });
    this.socket.on("leave room", (playerList) => {
      this.setState({ players: playerList });
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
    console.log(this.state.players);
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
    this.setState({ game: newGameFen });

    if (!this.state.endOfGame && gameCopy.in_checkmate()) {
      let opponentName = this.getOpponentName();
      this.setState({ endOfGame: true, message: "You are the winner!" });
      await this.sendResults(this.props.userData.user, 1, 0, 0);
      await this.sendResults(opponentName, 0, 1, 0);
      this.socket.emit("new message", `${this.props.userData.user} Wins`);
    }

    return move;
  }

  async sendResults(name, won, lost, draw) {
    const response = await this.networking.postResult(name, won, lost, draw);

    return response;
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
        {this.state.message}
        <Chessboard
          id="PlayVsPlay"
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
  }
}

export default PlayOnline;
