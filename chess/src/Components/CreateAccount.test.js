import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateAccount from "./CreateAccount";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LogIn from "./LogIn";
configure({ adapter: new Adapter() });

describe("Create account page form should include all elements", () => {
  test("Username form element must load", () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );
    const input = screen.getByPlaceholderText("Username");
    expect(input).toBeInTheDocument();
  });
});
test("Password form element must load", () => {
  render(
    <Router>
      <CreateAccount />
    </Router>
  );
  const password = screen.getByPlaceholderText("Password");
  expect(password).toBeInTheDocument();
});

test("Register button must load", () => {
  render(
    <Router>
      <CreateAccount />
    </Router>
  );
  const button = screen.getByTestId("register-input");
  expect(button).toBeInTheDocument();
});

// describe("CreateAccount", () => {
//   let wrapper;
//   //   let sessionCookie;
//   //   function getCookie(newCookie) {
//   //     sessionCookie = newCookie;
//   //   }
//   beforeEach(() => {
//     wrapper = shallow(<CreateAccount newCookie={this.getCookie.bind(this)} />);
//   });
