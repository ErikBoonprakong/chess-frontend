import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import "./home.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bodyWrapperHome">
        <div className="buttonWrapper">
          <Link to="/playai">
            <button>Play AI</button>
          </Link>
          <Link to="/playonline">
            <button>Play Online</button>
          </Link>
          <Link to="/leaderboards">
            <button>Leaderboards</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
