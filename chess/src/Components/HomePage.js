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
            <button className="home-btn">Play AI</button>
          </Link>
          <Link to="/playonline">
            <button className="home-btn">Play Online</button>
          </Link>
          <Link to="/leaderboard">
            <button className="home-btn">Leaderboards</button>
          </Link>
          <Link to="/savedgames">
            <button className="home-btn">Saved Games</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
