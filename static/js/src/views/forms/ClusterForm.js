const m = require("mithril")
import {hasPermission, token} from "../../auth";
import {Cluster} from "../../models/Cluster";

const ClusterForm = {
  oninit: function(vnode) {
    if (vnode.attrs.id) {
      Cluster.load(vnode.attrs.id);
    } else {
      Cluster.current = {"name": "my cluster"};
    }
  },

  view: function() {
    return m("form", {
      name: "cluster-form",
      onsubmit: function(event) {
        event.preventDefault();
        Cluster.save();
        m.route.set("/dashboard");}
      }, this.getFieldset()
    );
  },

  getFieldset: function() {
    console.log(Cluster);
    let nameFields = [m("label", "Name")];
    let noteFields = [m("label", "Notes")];
    if (hasPermission('post:clusters')) {
      nameFields.push(
        m("input[type=text][placeholder=Name]", {
          id: "name",
          oninput: function(e) {
            Cluster.current.name = e.target.value;
          },
          value: Cluster.current.name})
      );
      noteFields.push(
        m("textarea[rows=8]", {
          id: "notes",
          oninput: function(e) {
            Cluster.current.notes = e.target.value;
          },
          value: Cluster.current.notes})
      )
    } else if (hasPermission('patch:clusters')) {
      nameFields.push(
        m("input[type=text][placeholder=Name]", {
          id: "name",
          readonly: true,
          value: Cluster.current.name})
      );
      noteFields.push(
        m("textarea[rows=8]", {
          id: "notes",
          oninput: function(e) {
            Cluster.current.notes = e.target.value;
          },
          value: Cluster.current.notes})
      )
    } else {
      nameFields.push(
        m("input[type=text][placeholder=Name]", {
          id: "name",
          readonly: true,
          value: Cluster.current.name})
      );
      noteFields.push(
        m("textarea[rows=8]", {
          id: "notes",
          readonly: true,
          value: Cluster.current.notes})
      )
    }

    return m("fieldset", [
      m("div", {class: "flex"}, nameFields),
      m("div", {class: "flex"}, noteFields),
      m("div", {class: "flex"}, this.getButtons()),
    ]);
  },

  getButtons: function() {
    console.log(Cluster);
    let myButtons = [];
    if (hasPermission('post:clusters') || hasPermission('patch:clusters')) {
      myButtons.push(m("button.button[type=submit]", {class: "small"}, "Save"));
    }
    myButtons.push(
      m("button.button[type=button]", {
        class: "small pseudo",
        onclick: function() {
          m.route.set("/dashboard");
        }
      }, "Cancel")
    );
    if (hasPermission('delete:clusters') && Cluster.current.id) {
      myButtons.push(
        m("button.button[type=button]", {
          class: "pseudo small",
          onclick: function() {
            if (window.confirm("Are you sure you want to delete this?")) {
              return m.request({
                method: "DELETE",
                url: "https://cs-monitor.herokuapp.com/api/v1.0/clusters/" + Cluster.current.id,
                headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"}
              }).then(function(result) {
                  m.route.set("/dashboard");
              })
            }
          }
        }, "Delete")
      )
    }
    return myButtons;
  }
}

export {ClusterForm};
