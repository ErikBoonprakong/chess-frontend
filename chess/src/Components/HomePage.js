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
        <div className="buttonWrapper middle">
          <Link to="/options">
            <button className="home-btn">
              <span>Play AI</span>
            </button>
          </Link>
          <Link to="/playonline">
            <button className="home-btn">
              <span>Play Online</span>
            </button>
          </Link>
          <Link to="/leaderboard">
            <button className="home-btn">
              <span>Leaderboards</span>
            </button>
          </Link>
          <Link to="/savedgames">
            <button className="home-btn">
              <span>Saved Games</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
