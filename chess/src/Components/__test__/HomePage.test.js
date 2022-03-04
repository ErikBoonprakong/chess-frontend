import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import HomePage from "../HomePage";

describe("HomePage", () => {
  test("HomePage contains Leaderboard button and contains link to leaderboard page", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole("link");
    for (let button of buttons) {
      expect(button).toBeInTheDocument();
    }
    console.log(buttons);
    expect(buttons[2].href).toBe("http://localhost/leaderboard");
  });

  test("HomePage contains PlayAI button and contains link to options page", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole("link");
    for (let button of buttons) {
      expect(button).toBeInTheDocument();
    }

    expect(buttons[0].href).toBe("http://localhost/options");
  });

  test("HomePage contains Play Online button and contains link to chooseroom page", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole("link");
    for (let button of buttons) {
      expect(button).toBeInTheDocument();
    }

    expect(buttons[1].href).toBe("http://localhost/chooseroom");
  });

  test("HomePage contains Saved games button and contains link to page with saved games", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole("link");
    for (let button of buttons) {
      expect(button).toBeInTheDocument();
    }

    expect(buttons[3].href).toBe("http://localhost/savedgames");
  });
});
