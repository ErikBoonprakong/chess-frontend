import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateAccount from "../CreateAccount";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LogIn from "../LogIn";
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

test("Checkbox should be unchecked on load", () => {
  render(
    <Router>
      <CreateAccount />
    </Router>
  );
  const checkboxUnchecked = screen.getByTestId("unchecked");
  expect(checkboxUnchecked).not.toBeChecked();
});

describe("CreateAccount", () => {
  let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }
  beforeEach(() => {
    wrapper = shallow(
      <CreateAccount newCookie={(newCookie) => getCookie(newCookie)} />
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
        confirm: "",
        showPassword: false,
        error: "",
        valid: true,
        redirect: false,
        cookies: sessionCookie,
      };
      wrapper.instance().handleChange(mockUsername);
      wrapper.instance().handleChange(mockPassword);
      expect(wrapper.state().username).toEqual(expected.username);
      expect(wrapper.state().password).toEqual(expected.password);
    });
  });

  describe("handleSubmitTest", () => {
    it("prevent default should be called when submitted", () => {
      const mockPreventDefault = jest.fn();
      const mockEvent = {
        preventDefault: mockPreventDefault,
      };
      wrapper.instance().handleSubmit(mockEvent);
      expect(mockPreventDefault).toHaveBeenCalled();
    });
  });
});

// describe("Buttons must be firing correctly", () => {
//   test("Register button handleSubmit must fire", () => {
//     handleSubmit = jest.fn();
//     act(() => {
//       render(
//         <Router>
//           <CreateAccount />
//         </Router>,
//         container
//       );
//     });

//     const registerButton = document.querySelector(
//       "[data-testid=register-input]"
//     );
//     expect(registerButton.innerHTML).toBe("Create Account");

//     expect(this.handleSubmit).toHaveBeenCalledTimes(1);
//   });
// });
