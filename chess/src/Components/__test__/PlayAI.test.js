import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import Enzyme, { shallow, render, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ReactDOM from "react-dom";
import PlayAI from "../PlayAI";
import ChooseDifficulty from "../ChooseDifficulty";
// import * as Chess from "chess.js";

import { useEffect, useRef, useState } from "react";
// import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import cookieObj from "../GetCookies";
import { minimax } from "../ChessMLAlgorithm";
import Networking from "../Networking";
import { Redirect } from "react-router";

const Chess = require("chess.js").Chess;

configure({ adapter: new Adapter() });
describe("Play Against AI", () => {
  let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }
  const game = new Chess(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  let props = {
    location: {
      state: {
        state: {
          difficulty: "1",
          inCheck: 1,
          optimalMove: 1,
          reset: 0,
          submit: true,
          undo: 0,
          userColour: "w",
        },
      },
      chessboard: game,
    },
  };
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
  let ChooseDifficultyWrapper;
  beforeEach(() => {
    wrapper = shallow(<PlayAI {...props} />);
    ChooseDifficultyWrapper = shallow(<ChooseDifficulty />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Get hints button disabled if the used doesn't choose to have hints.", () => {
    // expect(getByText(/Click me/i).closest('button')).toBeDisabled();
    const button = screen.getByText("Get Hints");
    expect(button).toBeDisabled();
  });
});

describe("PlayAI test", () => {
  let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }
  const game = new Chess(
    "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3"
  );
  let checkProps = {
    location: {
      state: {
        state: {
          difficulty: "1",
          inCheck: 1,
          optimalMove: 1,
          reset: 0,
          submit: true,
          undo: 0,
          userColour: "w",
        },
      },
      chessboard: game,
    },
  };

  beforeEach(() => {
    wrapper = shallow(<PlayAI {...checkProps} />);
  });
  it("should notify me when I'm in check, if the option is enabled", async () => {
    const messageDiv = screen.getByText("is in check!");
    expect(messageDiv).toBeTruthy();
    // getByTestId("play-ai-message");
    // expect(messageDiv).toContain("is in check!");
  });
});
