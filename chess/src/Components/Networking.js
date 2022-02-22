const API_URL = "https://chessyem.herokuapp.com";

class Networking {
  async postUser(username, password, confirmation) {
    let response = await fetch(`${API_URL}/users`, {
      method: "POST",
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
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
      credentials: true,
      headers: {
        "tent-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
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
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    let json = await response.json();
    return json;
  }
}

export default Networking;
