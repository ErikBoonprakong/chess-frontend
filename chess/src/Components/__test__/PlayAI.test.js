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
import ReactDOM from "react-dom";
import PlayAI from "../PlayAI";
configure({ adapter: new Adapter() });

describe("Log In", () => {
  let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }
  beforeEach(() => {
    wrapper = shallow(
      <PlayAI newCookie={(newCookie) => getCookie(newCookie)} />
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("PlayAI test", () => {
    it("should notify me when I'm in check, if the option is enabled", () => {
      
    });
  });
});