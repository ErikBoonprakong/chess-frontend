import React from "react";
import { Link, Redirect } from "react-router-dom";

class ChooseRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bathroom: true, livingRoom: true };
  }

  render() {
    return (
      <div>
        <Link
          to={{
            pathname: "/playonline",
            state: {
              roomNumber: 0,
              roomName: "bathroom",
            },
          }}
        >
          <button id="bathroom" value="bathroom">
            Bathroom
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 1, roomName: "livingRoom" },
          }}
        >
          <button id="livingRoom" value="livingRoom">
            Living Room
          </button>
        </Link>
      </div>
    );
  }
}

export default ChooseRoom;
