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
          <Link to="/options">
            <button className="playButton">Play AI</button>
          </Link>
          <Link to="/playonline">
            <button className="playButton">Play Online</button>
          </Link>
          <Link to="/leaderboards">
            <button className="playButton">Leaderboards</button>
          </Link>
          <Link to="/savedgames">
            <button className="playButton">Saved Games</button>
          </Link>
          <Link to="/playonline">
            <button>Play Online</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
