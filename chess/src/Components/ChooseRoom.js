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
          <button id="basement" value="basement" className="room-btn">
            Basement
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 4, roomName: "yassinsRoom" },
          }}
        >
          <button id="yassinsRoom" value="yassinsRoom" className="room-btn">
            Yassin's Room
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 5, roomName: "megansRoom" },
          }}
        >
          <button id="megansRoom" value="megansRoom" className="room-btn">
            Megan's Room
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 6, roomName: "eriksRoom" },
          }}
        >
          <button id="eriksRoom" value="eriksRoom" className="room-btn">
            Erik's Room
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 7, roomName: "kitchen" },
          }}
        >
          <button id="kitchen" value="kitchen" className="room-btn">
            Kitchen
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 8, roomName: "loft" },
          }}
        >
          <button id="loft" value="loft" className="room-btn">
            Loft
          </button>
        </Link>
        <Link
          to={{
            pathname: "/playonline",
            state: { roomNumber: 9, roomName: "garden" },
          }}
        >
          <button id="garden" value="garden" className="room-btn">
            Garden
          </button>
        </Link>
      </div>
    );
  }
}

export default ChooseRoom;
