import React from "react";
import { Link } from "react-router-dom";
import Networking from "./Networking";
import cookieObj from "./GetCookies";

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
        {console.log(this.props.userData)}

        <div className="logo">
          <h4>CHESS YEM LOGO</h4>
        </div>
        <Link to="/home">
          {" "}
          <button>Home</button>
        </Link>
        <span>
          Signed in as: <p>{this.props.userData.user}</p>
        </span>
        <Link to="/login">
          <button
            onClick={async () => {
              await this.Networking.logOut();
              this.props.newCookie(cookieObj());
            }}
          >
            Logout
          </button>
        </Link>
        <hr />
      </div>
    );
  }
}

export default Header;
