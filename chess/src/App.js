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

class App extends React.Component {
  constructor() {
    super();
    this.state = { cookie: cookieObj() };
  }

  getCookie(newCookie) {
    this.setState({ cookie: newCookie });
  }

  render() {
    return (
      <div className="App">
        <Header
          newCookie={this.getCookie.bind(this)}
          userData={this.state.cookie}
        />
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
          <Route path="/playonline">
            <PlayOnline userData={this.state.cookie} />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/savedgames">
            <SavedGames />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
