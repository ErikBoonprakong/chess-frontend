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
    };
  }

  getCookie(newCookie) {
    this.setState({ cookie: newCookie });
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
              <ChooseRoom userData={this.state.cookie} />
            </Route>
            <Route path="/playonline">
              {(props) => (
                <PlayOnline userData={this.state.cookie} {...props} />
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
