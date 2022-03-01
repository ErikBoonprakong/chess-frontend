import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import LogIn from "./LogIn";
import ReactDOM from "react-dom";

describe("Login page form should include all elements", () => {
  test("Username form element must load", () => {
    render(
      <Router>
        <LogIn />
      </Router>
    );
    const input = screen.getByPlaceholderText("Username");
    expect(input).toBeInTheDocument();
  });
});
test("Password form element must load", () => {
  render(
    <Router>
      <LogIn />
    </Router>
  );
  const password = screen.getByPlaceholderText("Password");
  expect(password).toBeInTheDocument();
});

test("Register button must load", () => {
  render(
    <Router>
      <LogIn />
    </Router>
  );
  const button = screen.getByTestId("register-btn");
  expect(button).toBeInTheDocument();
});

// describe("handleChangeTest", () => {
//   test("call onSubmit with the username and password when submitted", () => {
//     const handleSubmit = jest.fn();
//     const container = document.createElement("div");
//     render(
//       <Router>
//         <LogIn />
//       </Router>,
//       container
//     );

//     const form = container.querySelectorAll("form");
//     const { username, password } = form.elements;
//     username.value = "chucknorris";
//     password.value = "password";

//     form.dispatchEvent(new window.Event("submit"));

//     expect(handleSubmit).toHaveBeenCalledTimes(1);
//     expect(handleSubmit).toHaveBeenCalledWith({
//       username: username.value,
//       password: password.value,
//     });
//   });
// });
