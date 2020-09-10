const m = require("mithril");
// import { toggleDisplayState } from '';

module.exports = {
  view: function(vnode) {
    var c = vnode.attrs.data;
    console.log(c);
    var health = (c.health === undefined) ? "ok" : c.health[1];
    var count = (c.servers === undefined) ? 0 : c.servers.length;

    // build the buttons available in menu
    var myButtons = [
      m("span", {
        class: "button pseudo stack",
        onclick: function() {
          m.route.set('/clusters/:clusterid/notes', {clusterid: c.id})
        }}, "notes"),
      m("span", {
        class: "button pseudo stack",
        onclick: function() {
          m.route.set('/clusters/:clusterid/servers', {clusterid: c.id})
        }}, "servers")
    ];

    // #TODO: add auth based buttons here

    return m("div", {class: "card"}, [
      m("span", {
        style: "float: right;",
        class: "button pseudo small",
        onclick: function(e) {
          toggleDisplayState("menu-" + c.id);
        }}, m("i", {class: "fas fa-bars", style: "padding-right: .25em;"}, "")),
      m("div", [
        m("span", {class: "jewel " + health}, ""),
        m("span", c.name)]),
      m("div", {
        id: "menu-" + c.id,
        style: "float: right; display: none; border: solid 1px #ccc;"
      }, myButtons)
    ]);
  }
}

function toggleDisplayState(elementId) {
  /*
  toggle the style display of an element
  args: id of the element
  */
  var target = document.getElementById(elementId);

  if (target.style.display == "block") {
    target.style.display = "none";
  } else {
    target.style.display = "block";
  }
}
