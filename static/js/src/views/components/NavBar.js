const m = require("mithril");
import {auth0, token} from "../../auth.js";

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
      m("div", {class: menu}, [
        m(m.route.Link, {
          class: "button psuedo",
          href: "/dashboard",
          id: "dashboardLink",
          style: "display: none;"}, "dashboard"),
        m("button", {
          class: "button small",
          id: "tokenButton",
          style: "display: none;",
          onclick: function() {
            prompt("press ctrl+c to copy the text below", token);
          }}, "Token"),
        m("button", {
          class: "button small",
          id: "logoutButton",
          style: "display: none;"}, "Logout"),
        m("button", {
          class: "button small",
          id: "loginButton",
          onclick: async function() {
            await auth0.loginWithRedirect();
          }}, "Login")
      ])
    ]
    return m("div", {class: "navbar"}, elements);
  },
  refresh: function() {
    if (token) {
      document.getElementById("loginButton").style.display="none";
      document.getElementById("logoutButton").style.display="block";
      document.getElementById("tokenButton").style.display="block";
      document.getElementById("dashboardLink").style.display="block";
    } else {
      document.getElementById("loginButton").style.display="block";
      document.getElementById("logoutButton").style.display="none";
      document.getElementById("tokenButton").style.display="none";
      document.getElementById("dashboardLink").style.display="none";
    }
  }
}

export {NavBar};
