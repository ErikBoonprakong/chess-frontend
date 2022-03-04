import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./ChooseRoom.css";

class ChooseRoom extends React.Component {


  constructor(props) {
    super(props);
    this.state = { rooms: [[], [], []] };
  }


  render() {
    return (
      <div className="room-container">
        <Link
          to={{
            pathname: "/playonline",
            state: {
              roomNumber: 0,
              roomName: "bathroom",
            },
          }}
        >
          <button id="bathroom" value="bathroom" className="room-btn">
            Bathroom
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 1, roomName: "livingRoom" },
          }}
        >
          <button id="livingRoom" value="livingRoom" className="room-btn">
            Living Room
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 2, roomName: "diningRoom" },
          }}
        >
          <button id="diningRoom" value="diningRoom" className="room-btn">
            Dining Room
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 3, roomName: "basement" },
          }}
        >
          <button id="basement" value="basement">
            Dining Room
          </button>
        </Link>
      </div>
    );
  }
}

export default ChooseRoom;
