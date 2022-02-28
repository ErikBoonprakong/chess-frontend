const API_URL = "https://chessyem.herokuapp.com";
// const API_URL = "http://localhost:8080";
// const API_URL = process.env.REACT_APP_API_URL;

class Networking {
  async postUser(username, password, confirmation) {
    let response = await fetch(`${API_URL}/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confirmation: confirmation,
      }),
    });

    let json = await response.json();
    return { json, status: response.status };
  }

  async postLogin(username, password) {
    let response = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      credentials: "include",
      sameSite: "None",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    let json = await response.json();
    return json;
  }

  async logOut() {
    let response = await fetch(`${API_URL}/sessions`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    return json;
  }

  async saveGame(
    user_id,
    reset,
    undo,

    optimalMove,
    difficulty,
    game_fen
  ) {
    let response = await fetch(`${API_URL}/savegames`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        reset: reset,
        undo: undo,

        optimal_move: optimalMove,
        difficulty: difficulty,
        game_fen: game_fen,
      }),
    });
    let json = await response.json();

    return json;
  }

  async postResult(username, won, lost, draw, score) {
    let response = await fetch(`${API_URL}/leaderboard`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // user_id: user_id,
        username: username,
        won: won,
        lost: lost,
        draw: draw,
        score: score,
      }),
    });
    let json = await response.json();
    return json;
  }

  async getScores() {
    const response = await fetch(`${API_URL}/scores`);
    let scores = await response.json();
    return scores;
  }

  async getSavedGamesById(user_id) {
    const response = await fetch(`${API_URL}/savedgames/${user_id}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    let json = await response.json();

    return json;
  }
}

export default Networking;
