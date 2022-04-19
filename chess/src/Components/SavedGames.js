import React from "react";
import Networking from "./Networking.js";
import cookieObj from "./GetCookies";
import GameCard from "./GameCard";

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
    //Output the games from the latest saved
    const savedGamesReverse = savedGames.reverse();
    await this.setState({ savedGames: savedGamesReverse });
  }
  async getListOfSavedGames(user_id) {
    const savedGames = this.networking.getSavedGamesById(user_id);
    return savedGames;
  }
  displaySavedGames() {
    const gameComponents = this.state.savedGames.map((game) => {
      return <GameCard key={game.id} options={game} />;
    });

    return gameComponents;
  }

  render() {
    return (
      <div className="full-page-of-saved-games">
        {/* Conditional rendering */}
        {this.state.savedGames.length ? this.displaySavedGames() : null}
      </div>
    );
  }
}

export default SavedGames;
