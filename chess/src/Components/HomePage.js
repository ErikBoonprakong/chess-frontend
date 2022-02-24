import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import "./home.css";
// import io from "socket.io-client";

class HomePage extends React.Component {
  // state = {
  //   error: null,
  //   gameId: null,
  //   waiting: false,
  //   whiteId: null,
  // };

  // async startOnlineGame() {
  //   const member = {
  //     uuid: this.state.user.uuid,
  //     name: localStorage.getItem("user"),
  //     creator: true,
  //   };
  //   const game = {
  //     status: "waiting",
  //     members: [member],
  //     gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
  //   };
  //   // await db.collection("games").doc(game.gameId).set(game);
  // }

  // componentDidMount() {
  //   this.socket = io("http://localhost:6000");

  //   this.socket.on("connection", () => {
  //     console.log("Connected");
  //   });

  //   this.socket.on("START_GAME", (game) => {
  //     this.receiveGame(game);
  //   });
  // }

  // componentWillUnmount() {
  //   this.socket.removeAllListeners();
  //   this.socket.close();
  // }

  // createGame = () => {
  //   const { user } = this.props.userData.user;
  //   const data = {
  //     userId: user.user_id,
  //     username: user.username,
  //   };
  //   this.socket.emit("CREATE_GAME", data);
  //   this.setState({ waiting: true }, () => {
  //     setTimeout(() => {
  //       this.socket.on("RECEIVE_GAME", (game) => {
  //         this.receiveGame(game);
  //       });
  //     }, 500);
  //     this.stopWaiting = setTimeout(() => {
  //       this.socket.removeListener(
  //         "RECEIVE_GAME",
  //         (game) => {
  //           this.setState({
  //             error: "Could not find an opponent",
  //             waiting: false,
  //           });
  //           setTimeout(() => {
  //             this.setState({ error: null });
  //           }, 2000);
  //         },
  //         10000
  //       );
  //     });
  //   });
  // };
  render() {
    return (
      <div className="bodyWrapperHome">
        <div className="buttonWrapper">
          <Link to="/playai">
            <button className="playButton">Play AI</button>
          </Link>
          <Link to="/playonline">
            <button className="playButton">Play Online</button>
          </Link>
          <Link to="/leaderboards">
            <button className="playButton">Leaderboards</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
