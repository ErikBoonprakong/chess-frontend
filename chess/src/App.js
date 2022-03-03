import "./App.css";
import CreateAccount from "./Components/CreateAccount";
import LogIn from "./Components/LogIn";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import HomePage from "./Components/HomePage";
import PlayAI from "./Components/PlayAI";
import PlayOnline from "./Components/PlayOnline";
import Leaderboard from "./Components/Leaderboard";
import Header from "./Components/Header";
import React from "react";
import cookieObj from "./Components/GetCookies";
import ChooseDifficulty from "./Components/ChooseDifficulty";
import SavedGames from "./Components/SavedGames";
import ChooseRoom from "./Components/ChooseRoom";

class App extends React.Component {
  constructor() {
    super();
    this.state = { cookie: cookieObj(), rooms: { bathroom: 0, livingRoom: 0 } };
  }

  getCookie(newCookie) {
    this.setState({ cookie: newCookie });
  }

  // disableFullRooms = async (roomName) => {
  //   if (this.state[roomName]) {
  //     await this.setState({ [roomName]: false });
  //   }
  // };

  // enableRoom = async (roomName) => {
  //   if (!this.state[roomName]) {
  //     await this.setState({ [roomName]: true });
  //   }
  // };

  playersInRooms(room, numberOfPlayers) {
    const roomPeople = this.state.rooms;
    roomPeople[room] = numberOfPlayers;
    this.setState({ rooms: roomPeople });
  }

  render() {
    return (
      <div id="App" className="App">
        <Header
          className="App-header"
          newCookie={this.getCookie.bind(this)}
          userData={this.state.cookie}
        />
        <div className="notHeader">
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <LogIn newCookie={this.getCookie.bind(this)} />
            </Route>
            <Route path="/register">
              <CreateAccount newCookie={this.getCookie.bind(this)} />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/options">
              <ChooseDifficulty />
            </Route>
            <Route path="/playai">{(props) => <PlayAI {...props} />}</Route>
            <Route path="/chooseroom">
              <ChooseRoom
                userData={this.state.cookie}
                // bathroom={this.state.bathroom}
                // livingRoom={this.state.livingRoom}
                rooms={this.state.rooms}
              />
            </Route>
            <Route path="/playonline">
              {(props) => (
                <PlayOnline
                  playersInRooms={() => this.playersInRooms()}
                  // disableRoom={(roomName) => this.disableFullRooms(roomName)}
                  // enableRoom={(roomName) => this.enableRoom(roomName)}
                  userData={this.state.cookie}
                  {...props}
                />
              )}
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/savedgames">
              <SavedGames />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
