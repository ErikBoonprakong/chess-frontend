import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import "./home.css";

class PlayOnline extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bodyWrapperHome">
        <h1>Play Online</h1>
      </div>
    );
  }
}

export default PlayOnline;