const m = require("mithril")

const header = document.getElementById("myheader");
const root = document.getElementById("myapp");

var Title = require("./views/components/Title");
var Dash = require("./views/pages/DashPage");
var Login = require("./views/pages/LoginPage");
var ClusterForm = require("./views/forms/ClusterForm");

m.mount(header, Title);
m.route(root, "/", {
  "/": Dash,
  "/login": Login,
  "/clusters/create": ClusterForm,
  "/clusters/:id": ClusterForm,
})
