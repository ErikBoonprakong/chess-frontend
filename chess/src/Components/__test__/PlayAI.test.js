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
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import cookieObj from "../GetCookies";
import { minimax } from "../ChessMLAlgorithm";
import Networking from "../Networking";
import { Redirect } from "react-router";
configure({ adapter: new Adapter() });

describe("Play Against AI", () => {
  let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }
  let props = {
    location: {
      state: {
        state: {
          difficulty: "1",
          inCheck: 1,
          optimalMove: 0,
          reset: 0,
          submit: true,
          undo: 0,
          userColour: null,
        },
      },
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
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

  describe("PlayAI test", () => {
    it("should notify me when I'm in check, if the option is enabled", async () => {
      const mockColour = {
        target: { id: "w" },
      };
      const mockDifficulty = {
        target: { value: "1" },
      };
      const inCheckHint = {
        target: { id: "inCheck" },
      };
      await ChooseDifficultyWrapper.handleOptions(inCheckHint);
      ChooseDifficultyWrapper.handleSubmit(mockDifficulty);
      wrapper.changeUserColour(mockColour);
      console.log(wrapper.state());
    });
  });
});
