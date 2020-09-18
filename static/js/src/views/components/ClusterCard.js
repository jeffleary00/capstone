import {hasPermission} from "../../auth";
const m = require("mithril");

const ClusterCard = {
  oninit: function(vnode) {
    this.cluster = vnode.attrs.data;
    this.health = (this.cluster.health === undefined) ? "ok" : this.cluster.health[1];
  },

  view: function() {
    let self = this;
    return m("div", {class: "card"}, [
      m("span", {
        style: "float: right;",
        class: "button pseudo small",
        onclick: function(e) {
          toggleDisplayState("menu-" + self.cluster.id);
        }}, "menu"),
      m("div", [
        m("span", {class: "jewel " + self.health}, ""),
        m("span", self.cluster.name)
      ]),
      m("div", {class: "small"}, "status: " + self.health),
      self.widgetMenu()
    ]);
  },

  widgetMenu: function() {
    let self = this;
    let menu = [];

    // servers view button always visible
    menu.push(
      m("span", {
        class: "button pseudo small stack",
        onclick: function() {
          m.route.set('/servers', {clusterid: self.cluster.id});
        }}, "Servers")
    );

    // Notes button always visible
    menu.push(
      m("span", {
        class: "button pseudo small stack",
        onclick: function() {
          prompt("Notes for '" + self.cluster.name + "'", self.cluster.notes);
        }}, "Notes")
    );

    if (hasPermission('post:clusters') || hasPermission('patch:clusters')) {
      menu.push(
        m("span", {
          class: "button pseudo small stack",
          onclick: function() {
            m.route.set('/clusters/:clusterid', {clusterid: self.cluster.id});
          }
        }, "Edit"),
      )
    }

    return m("div", {
      id: "menu-" + self.cluster.id,
      style: "float: right; display: none; border: solid 1px #ccc;"
    }, menu);
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

export {ClusterCard};
