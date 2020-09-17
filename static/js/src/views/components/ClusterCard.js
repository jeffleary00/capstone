const m = require("mithril");
import {hasPermission} from "../../auth";

const ClusterCard = {
  oninit: function(vnode) {
    this.cluster = vnode.attrs.data;
    console.log(this.cluster);
    this.health = (this.cluster.health === undefined) ? "ok" : this.cluster.health[1];
  },

  view: function() {
    return m("div", {class: "card"}, [
      m("span", {
        style: "float: right;",
        class: "button pseudo small",
        onclick: function(e) {
          toggleDisplayState("menu-" + this.cluster.id);
        }}, "&#9776;"),
      m("div", [
        m("span", {class: "jewel " + this.health}, ""),
        m("span", this.cluster.name)
      ]),
      m("div", {class: "small"}, "status: " + this.health),
      m("div", {
        id: "menu-" + c.id,
        style: "float: right; display: none; border: solid 1px #ccc;"
      }, this.widgetMenu())
    ]);
  },

  widgetMenu: function() {
    let menu = [];

    // servers view button always visible
    menu.push(
      m("span", {
        class: "button pseudo stack",
        onclick: function() {
          m.route.set('/servers', {cluster: this.cluster.id});
        }}, "Servers")
    );

    // Notes button always visible
    menu.push(
      m("span", {
        class: "button pseudo stack",
        onclick: function() {
          prompt("Notes for '" + this.cluster.name + "'", this.cluster.notes);
        }}, "Notes")
    );

    if (hasPermission('post:clusters') || hasPermission('patch:clusters')) {
      menu.push(
        m("span", {
          class: "button pseudo stack",
          onclick: function() {
            m.route.set('/clusters/:clusterid', {clusterid: this.cluster.id});
          }
        }, "Edit"),
      )
    }

    return m("div", {
      id: "menu-" + this.cluster.id,
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
