// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "https://chessyem.herokuapp.com";
// const API_URL = "http://localhost:8080";

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
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
    });
    let json = await response.json();
    return json;
  }
}

export default Networking;
