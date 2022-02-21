import logo from "./logo.svg";
import "./App.css";
import CreateAccount from "./Components/CreateAccount";
import LogIn from "./Components/LogIn";
import { Switch, Route, Redirect, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/register">
        <button>Create Account</button>
      </Link>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <LogIn getNew={this.getCookie.bind(this)} />
        </Route>
        <Route path="/register">
          <CreateAccount />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
