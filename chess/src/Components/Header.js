import React from "react";
import { Link } from "react-router-dom";
import Networking from "./Networking";
import cookieObj from "./GetCookies";
import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.Networking = new Networking();
    this.state = { user: this.props.userData.user };
  }

  render() {
    if (!this.props.userData.user) return <h2>Logo</h2>;
    return (
      <div className="header">
        <nav className="navMenu">
          {console.log(this.props.userData)}

          {/* <div className="logo">
            <img src="chessLogo.png" alt="chess"></img>
          </div> */}

          <span className="user-position">
            Signed in as: <p>{this.props.userData.user}</p>
          </span>
          <Link to="/login">
            <button
              className="header-btn"
              onClick={async () => {
                await this.Networking.logOut();
                this.props.newCookie(cookieObj());
              }}
            >
              Logout
            </button>
          </Link>
          <Link to="/home">
            <button className="header-btn">Home</button>
          </Link>

          {/* <hr /> */}
          <div className="dot"></div>
        </nav>
      </div>
    );
  }
}

export default Header;
