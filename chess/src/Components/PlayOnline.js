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
    };
    this.currentUser = cookieObj();
    this.networking = new Networking();
  }

  componentDidMount() {
    this.socket = io("http://localhost:4000");
    this.socket.on("new message", (msg) => {
      this.setState({ messageList: [...this.state.messageList, msg] });
    });

    this.socket.on("new move", (move) => {
      this.setState({ game: move });
    });
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
    const newGame = new Chess(this.state.game);
    const gameCopy = { ...newGame };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    if (move === null) return false;
    const newGameFen = gameCopy.fen();

    if (!this.state.endOfGame && gameCopy.in_checkmate()) {
      this.setState({ endOfGame: true, message: "You are the winner!" });
      const json = await this.sendResults(1, 0, 0);
      return json;
    } else if (this.state.endOfGame && gameCopy.in_checkmate()) {
      this.setState({ message: "You are the loser!" });
      const json = await this.sendResults(0, 1, 0);
      return json;
    } else if (gameCopy.in_draw()) {
      this.setState({ message: "Draw!" });
      const json = await this.sendResults(0, 0, 1);
      return json;
      ////game is a draw
    }
    this.socket.emit("new move", newGameFen);
    this.setState({ game: newGameFen });

    return move;
  }

  async sendResults(won, lost, draw) {
    const response = await this.networking.postResult(
      this.currentUser.user_id,
      this.currentUser.username,
      won,
      lost,
      draw
    );

    return response;
  }

  render() {
    const messageList = this.state.messageList.map((msg) => <div>{msg}</div>);
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
          <div className="messageDisplay">{messageList}</div>
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
