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
              roomName: "room1",
            },
          }}
        >
          <button id="room1" value="room1">
            Room 1
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 1, roomName: "room2" },
          }}
        >
          <button id="room2" value="room2">
            Room 2
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 2, roomName: "room3" },
          }}
        >
          <button id="room3" value="room3">
            Room 3
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 3, roomName: "room4" },
          }}
        >
          <button id="room4" value="room4">
            Room 4{" "}
          </button>
        </Link>

        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 4, roomName: "room5" },
          }}
        >
          <button id="room5" value="room5">
            Room 5{" "}
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 5, roomName: "room6" },
          }}
        >
          <button id="room6" value="room6">
            Room 6{" "}
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 6, roomName: "room7" },
          }}
        >
          <button id="room7" value="room7">
            Room 7{" "}
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 7, roomName: "room8" },
          }}
        >
          <button id="room8" value="room8">
            Room 8{" "}
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 8, roomName: "room9" },
          }}
        >
          <button id="room9" value="room9">
            Room 9{" "}
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 9, roomName: "room10" },
          }}
        >
          <button id="room10" value="room10">
            Room 10{" "}
          </button>
        </Link>
      </div>
    );
  }
}

export default ChooseRoom;
