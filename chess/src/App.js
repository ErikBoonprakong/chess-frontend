import logo from "./logo.svg";
import "./App.css";
import CreateAccount from "./Components/CreateAccount";
import LogIn from "./Components/LogIn";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import HomePage from "./Components/HomePage";
import PlayAI from "./Components/PlayAI";
import PlayOnline from "./Components/PlayOnline";
import Leaderboards from "./Components/PlayOnline copy";

function App() {
  return (
    <div className="App">
      <Link to="/register">
        <button>Create Account</button>
      </Link>
      <Link to="/home">
        <button>Test home page</button>
      </Link>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/register">
          <CreateAccount />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/playai">
          <PlayAI />
        </Route>
        <Route path="/playonline">
          <PlayOnline />
        </Route>
        <Route path="/leaderboards">
          <Leaderboards />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
