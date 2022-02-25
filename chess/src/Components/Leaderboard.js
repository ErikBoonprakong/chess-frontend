import React from "react";
// import Networking from "./Networking.js";
// import { Link, Redirect } from "react-router-dom";
import "./leaderboard.css";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { userId: 1, name: "Erik", points: 30, wins: 10, lose: 0, draw: 0 },
      { userId: 2, name: "Megan", points: 35, wins: 5, lose: 20, draw: 0 },
      { userId: 3, name: "Yassin", points: 23, wins: 1, lose: 0, draw: 10 },
      { userId: 4, name: "Sonali", points: 10, wins: 2, lose: 2, draw: 1 },
      { userId: 5, name: "Chris", points: 15, wins: 3, lose: 0, draw: 3 },
      { userId: 6, name: "Rob", points: 40, wins: 12, lose: 2, draw: 1 },
    ];
  }

  render() {
    const leaderboard = this.data.map((person) => {
      return (
        <tr>
          <td>{person.userId}</td>
          <td>{person.name}</td>
          <td>{person.points}</td>
          <td>{person.wins}</td>
          <td>{person.lose}</td>
          <td>{person.draw}</td>
        </tr>
      );
    });
    const test = "TEST";
    return (
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
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
