import React from "react";
import { Link, Redirect } from "react-router-dom";
import io from "socket.io-client";

class ChooseRoom extends React.Component {
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
          <button
            id="livingRoom"
            value="livingRoom"
            onClick={() => this.enterRoom(1)}
          >
            Living Room
          </button>
        </Link>
      </div>
    );
  }
}

export default ChooseRoom;
