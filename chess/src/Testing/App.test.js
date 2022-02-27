import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import Header from "../Components/Header.js";

describe("Login Page", () => {
  test("App loads login page by default", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(window.location.href).toBe("http://localhost/login");
  });

  //   test("Header contains logout button", async () => {
  //     render(
  //       <BrowserRouter>
  //         <Header />
  //       </BrowserRouter>
  //     );
  //     const logoutBtn = await screen.findByRole("button");
  //     expect(logoutBtn.innerHTML).toMatch(/Log Out/);
  //     expect(logoutBtn).toBeInTheDocument();
  //   });
  // });
});
