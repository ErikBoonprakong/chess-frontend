import React from "react";
import Networking from "./Networking.js";
import { Link, Redirect } from "react-router-dom";
import cookieObj from "./GetCookies";
import SavedGame from "./SavedGame.js";

class SavedGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedGames: [],
      cookies: cookieObj(),
    };
    this.networking = new Networking();
    this.cookies = cookieObj();
  }

  async componentDidMount() {
    const savedGames = await this.getListOfSavedGames(this.cookies.user_id);
    const savedGamesReverse = savedGames.reverse();
    await this.setState({ savedGames: savedGamesReverse });
  }
  async getListOfSavedGames(user_id) {
    const savedGames = this.networking.getSavedGamesById(user_id);
    return savedGames;
  }
  displaySavedGames() {
    const gameComponents = this.state.savedGames.map((game) => {
      return <SavedGame key={game.id} options={game} />;
    });
    console.log(gameComponents);
    return gameComponents;
  }

  render() {
    console.log(this.state.savedGames);
    return (
      <div>
        {this.state.savedGames.length ? this.displaySavedGames() : null}
      </div>
    );
  }
}

export default SavedGames;