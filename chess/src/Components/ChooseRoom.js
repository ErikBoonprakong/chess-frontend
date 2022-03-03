import React from "react";
import { Link, Redirect } from "react-router-dom";
import io from "socket.io-client";

class ChooseRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [[], []] };
  }

  componentDidMount() {
    // this.socket = io("https://chessyem-websocket.herokuapp.com");
    //   this.socket.emit("join lobby", this.props.userData.user);
    //   this.socket.on("room list", (rooms) => {
    //     this.setState({ rooms: rooms });
    //     console.log(this.state.rooms);
    //     this.rooms = rooms;
    //   });
  }

  //   updateRooms() {
  //     this.socket = io("https://chessyem-websocket.herokuapp.com");
  //     this.socket.emit("join lobby", this.props.userData.user);
  //     this.socket.on("room list", (rooms) => {
  //       if (this.state.rooms !== rooms) {
  //         this.setState({ rooms: rooms });
  //         console.log(this.state.rooms);
  //       }
  //     });
  //   }

  render() {
    // this.updateRooms();
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
          <button
            id="bathroom"
            value="bathroom"
            disabled={this.state.rooms[0].length >= 2}
          >
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
            disabled={this.state.rooms[1].length >= 2}
            onClick={console.log(this.state.rooms)}
          >
            Living Room
          </button>
        </Link>
      </div>
    );
  }
}

export default ChooseRoom;
