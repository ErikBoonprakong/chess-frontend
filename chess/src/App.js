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
    this.state = {
      cookie: cookieObj(),
      room1: true,
      room2: true,
      room3: true,
      room4: true,
      room5: true,
      room6: true,
      room7: true,
      room8: true,
      room9: true,
      room10: true,
    };
  }

  getCookie(newCookie) {
    this.setState({ cookie: newCookie });
  }

  disableFullRooms(roomName) {
    if (this.state[roomName]) {
      console.log("disabling room");
      this.setState({ [roomName]: false });
      console.log("room disabled");
    }
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
                room1={this.state.room1}
                room2={this.state.room2}
                room3={this.state.room3}
                room4={this.state.room4}
                room5={this.state.room5}
                room6={this.state.room6}
                room7={this.state.room7}
                room8={this.state.room8}
                room9={this.state.room9}
                room10={this.state.room10}
              />
            </Route>
            <Route path="/playonline">
              {(props) => (
                <PlayOnline
                  disableRoom={(roomName) => this.disableFullRooms(roomName)}
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
