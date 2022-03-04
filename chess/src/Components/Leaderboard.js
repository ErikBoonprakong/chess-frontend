import React from "react";
import "./leaderboard.css";
import Networking from "./Networking";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.Networking = new Networking();
    this.state = {
      data: [
        { userId: 1, name: "Erik", points: 30, wins: 10, lose: 0, draw: 0 },
      ],
    };
  }

  async componentDidMount() {
    //GET request in networking called to retrieve data to populate leaderboard.
    const scores = await this.Networking.getScores();
    await this.setState({ data: scores });
  }

  render() {
    //Each object in the data array within the state is mapped to a table, which is then rendered in the form of a leaderboard.
    const leaderboard = this.state.data.map((person, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{person.username}</td>
          <td>{person.score}</td>
          <td>{person.won}</td>
          <td>{person.lost}</td>
          <td>{person.draw}</td>
        </tr>
      );
    });
    return (
      <div className="leaderboard" id="gamers">
        <h1 data-testid="table-title">Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Points</th>
              <th>Win</th>
              <th>Lose</th>
              <th>Draw</th>
            </tr>
          </thead>
          <tbody>{leaderboard}</tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
