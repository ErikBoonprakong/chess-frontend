import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import Header from "../Components/Header.js";
import HomePage from "../Components/HomePage";
import Leaderboard from "../Components/Leaderboard";
import {
  getRowByFirstCellText,
  getAllCells,
} from "testing-library-table-queries";

describe("Login Page", () => {
  test("App loads login page by default", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(window.location.href).toBe("http://localhost/login");
  });
});

describe("Create Account Page", () => {
  test("Login page redirects to the Create Account page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const button = screen.getByRole("link");
    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    expect(window.location.href).toBe("http://localhost/register");
  });
});

describe("Leaderboard", () => {
  test("Leaderboard page is rendered with a table", () => {
    const { container } = render(<Leaderboard />);
    expect(getRowByFirstCellText(container, "Position")).toBeVisible();
    // const cells = getAllCells(getRowByFirstCellText(container, "John Smith"));
  });

  test("Correct title of leader board", () => {
    render(
      <BrowserRouter>
        <Leaderboard />
      </BrowserRouter>
    );

    const element = screen.getByTestId("table-title");
    expect(element).toHaveTextContent("Leaderboard");
  });
});
