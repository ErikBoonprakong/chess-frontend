import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatMessage: "", messageList: [] };
  }

  componentDidMount() {
    this.socket = io("http://localhost:4000");
    this.socket.on("new message", (msg) => {
      this.setState({ messageList: [...this.state.messageList, msg] });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ chatMessage: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    this.socket.emit("new message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const messageList = this.state.messageList.map((msg) => <div>{msg}</div>);
    return (
      <div className="chat">
        <form onSubmit={(e) => this.sendMessage(e)}>
          <input
            type="textarea"
            onChange={(e) => this.handleChange(e)}
            value={this.state.chatMessage}
          />
          <input type="submit" value="Send Message" />
        </form>
        <div className="messageDisplay">{messageList}</div>
      </div>
    );
  }
}

export default Chat;
