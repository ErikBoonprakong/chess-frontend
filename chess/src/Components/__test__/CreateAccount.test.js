// import { shallow } from "enzyme";
// import CreateAccount from "../CreateAccount.js";
// // import { render, screen } from "@testing-library/jest-dom";
// import cookieObj from "../GetCookies";

// describe("CreateAccount", () => {
//   let wrapper;
//   let sessionCookie;
//   function getCookie(newCookie) {
//     sessionCookie = newCookie;
//   }
//   beforeEach(() => {
//     wrapper = shallow(
//       <CreateAccount newCookie={(newCookie) => getCookie(newCookie)} />
//     );
//   });

//   it("should match the snapshot", () => {
//     expect(wrapper).toMatchSnapshot();
//   });

//   describe("handleChangeTest", () => {
//     it("should call setState on username", () => {
//       const mockUsername = {
//         target: {
//           id: "username",
//           value: "test",
//         },
//       };
//       const mockPassword = {
//         target: {
//           id: "password",
//           value: "testtest",
//         },
//       };
//       const expected = {
//         username: "test",
//         password: "testtest",
//         confirm: "",
//         showPassword: false,
//         error: "",
//         valid: true,
//         redirect: false,
//         cookies: cookieObj(),
//       };
//       wrapper.instance().handleChange(mockUsername);
//       wrapper.instance().handleChange(mockPassword);
//       expect(wrapper.state()).toEqual(expected);
//     });
//   });
// });
