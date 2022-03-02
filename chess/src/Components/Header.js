import React from "react";
import { Link } from "react-router-dom";
import Networking from "./Networking";
import cookieObj from "./GetCookies";
import "./header.css";
import logo from "./ChessYEM.jpeg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.Networking = new Networking();
    this.state = { user: this.props.userData.user };
  }

  render() {
    if (!this.props.userData.user) return <div></div>;
    return (
      <div className="header">
        <nav className="navMenu">
          {console.log(this.props.userData)}

          <div className="logo">
            <img src={logo} alt="chess"></img>
            <span className="user-position">
              <p>{this.props.userData.user}</p>
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
          </div>

          {/* <hr /> */}
          <div className="dot"></div>
        </nav>
      </div>
    );
  }
}

export default Header;
