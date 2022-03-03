import React from "react";
import { Link, Redirect } from "react-router-dom";
import io from "socket.io-client";

class ChooseRoom extends React.Component {


  constructor(props) {
    super(props);
    this.state = { rooms: [[], []] };
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
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 2, roomName: "diningRoom" },
          }}
        >
          <button id="diningRoom" value="diningRoom">
            Dining Room
          </button>
        </Link>
      </div>
    );
  }
}

export default ChooseRoom;
