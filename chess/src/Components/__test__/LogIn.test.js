import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LogIn from "../LogIn";
import cookieObj from "../GetCookies";

configure({ adapter: new Adapter() });

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

describe("Log In", () => {
  let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }
  beforeEach(() => {
    wrapper = shallow(
      <LogIn newCookie={(newCookie) => getCookie(newCookie)} />
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleChangeTest", () => {
    it("should call setState on username", () => {
      const mockUsername = {
        target: {
          id: "username",
          value: "test",
        },
      };
      const mockPassword = {
        target: {
          id: "password",
          value: "testtest",
        },
      };
      const expected = {
        username: "test",
        password: "testtest",
      };
      wrapper.instance().handleChange(mockUsername);
      wrapper.instance().handleChange(mockPassword);
      expect(wrapper.state().username).toEqual(expected.username);
      expect(wrapper.state().password).toEqual(expected.password);
    });
  });
});
