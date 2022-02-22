import React from "react";
import { Link, Redirect } from "react-router-dom";
import Networking from "./Networking";
import cookieObj from "./GetCookies";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.Networking = new Networking();
    this.state = { user: this.props.userData.user };
  }

  logOut() {
    console.log("Logging out...");
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <h4>CHESS YEM LOGO</h4>
          {console.log(this.props.userData)}
          <span>Signed in as: {this.props.userData.user}</span>
        </div>
        <Link to="/home">
          {" "}
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button
            onClick={async () => {
              await this.Networking.logOut();
              this.props.newCookie(cookieObj());
            }}
          >
            Log Out
          </button>
        </Link>
        <hr />
      </div>
    );
  }
}

export default Header;
