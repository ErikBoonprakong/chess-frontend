const API_URL = "http://localhost:8080";

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
}

export default Networking;
