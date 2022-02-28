import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogIn from "./LogIn";

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
