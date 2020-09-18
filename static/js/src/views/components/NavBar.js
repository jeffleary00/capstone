const m = require("mithril");
import {auth0, token, hasPermission} from "../../auth.js";

const NavBar = {
  view: function() {
    let elements = [
      m(m.route.Link, {
        href: "/",
        class: "brand"
      }, m("span", "Capstone Monitor")),
      m("input", {
        id: "bmenub",
        type: "checkbox",
        class: "show"
      }),
      m("label", {
        class: "burger pseudo button",
        for: "bmenub",
      }, "menu"),
      m("div", {class: "menu"}, [
        m("button", {
          class: "psuedo small",
          id: "tokenButton",
          style: "display: none;",
          onclick: function() {
            prompt("press ctrl+c to copy the jwt below", token);
          }}, "Token"),
        m("button", {
          class: "small",
          id: "logoutButton",
          style: "display: none;",
          onclick: function() {
            auth0.logout();
          }}, "Logout"),
        m("button", {
          class: "small",
          id: "loginButton",
          onclick: async function() {
            await auth0.loginWithRedirect();
          }}, "Login")
      ])
    ]
    return elements;
  }
}

export {NavBar};
