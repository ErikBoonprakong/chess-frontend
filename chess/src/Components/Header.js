import React from "react";
import { Link, Redirect } from "react-router-dom";

class Header extends React.Component {
  logOut() {
    console.log("Logging out...");
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <h4>CHESS YEM LOGO</h4>
        </div>
        <Link to="/home">
          {" "}
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button onClick={this.logOut}>Log Out</button>
        </Link>
        <hr />
      </div>
    );
  }
}

export default Header;
