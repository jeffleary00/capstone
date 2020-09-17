import {hasPermission, token} from "../../auth";
import {Server} from "../../models/Server";
import {Cluster} from "../../models/Cluster";
const m = require("mithril");

const ServerForm = {
  oninit: function(vnode) {
    Cluster.loadList();
    if (vnode.attrs.id) {
      Server.load(vnode.attrs.id);
    } else {
      Server.current = {"name": "my server"};
    }
  },

  view: function() {
    return m("form", {
      name: "server-form",
      onsubmit: function(event) {
        event.preventDefault();
        Server.save();
        m.route.set("/dashboard");}
      }, this.getFieldset()
    );
  },

  getFieldset: function() {
    let nameFields = [m("label", "Name")];
    let noteFields = [m("label", "Notes")];
    let clusterFields = [m("label", "Parent Cluster")];
    if (hasPermission('post:servers')) {
      nameFields.push(
        m("input[type=text][placeholder=Name]", {
          id: "name",
          value: Server.current.name,
          oninput: function(e) {
            Server.current.name = e.target.value;
          }
        })
      );
      noteFields.push(
        m("textarea[rows=8]", {
          id: "notes",
          value: Server.current.notes,
          oninput: function(e) {
            Server.current.notes = e.target.value;
          },
        })
      );
      clusterFields.push(
        m("select", {
            selectedIndex: (Server.current) ? Server.current.cluster_id : 0,
            onchange: function(e) {
              Server.current.cluster_id = Number(e.target.value);
            }
          }, Cluster.list.map(function(c) {
            if (Server.current.cluster_id == c.id) {
              return m("option", {value: c.id, selected: true}, c.name);
            } else {
              return m("option", {value: c.id}, c.name);
            }
          })
        )
      );
    } else if (hasPermission('patch:servers')) {
      nameFields.push(
        m("input[type=text][placeholder=Name]", {
          id: "name",
          // readonly: true,
          value: Cluster.current.name})
      );
      noteFields.push(
        m("textarea[rows=8]", {
          id: "notes",
          oninput: function(e) {
            Server.current.notes = e.target.value;
          },
          value: Server.current.notes})
      );
      clusterFields.push(
        m("select", {
            selectedIndex: (Server.current) ? Server.current.cluster_id : 0,
            readonly: true
          }, Cluster.list.map(function(c) {
            if (Server.current.cluster_id == c.id) {
              return m("option", {value: c.id, selected: true}, c.name);
            } else {
              return m("option", {value: c.id}, c.name);
            }
          })
        )
      );

    } else {
      nameFields.push(
        m("input[type=text][placeholder=Name]", {
          id: "name",
          // readonly: true,
          value: Server.current.name})
      );
      noteFields.push(
        m("textarea[rows=8]", {
          id: "notes",
          // readonly: true,
          value: Server.current.notes})
      );
      clusterFields.push(
        m("select", {
            selectedIndex: (Server.current) ? Server.current.cluster_id : 0,
            readonly: true
          }, Cluster.list.map(function(c) {
            if (Server.current.cluster_id == c.id) {
              return m("option", {value: c.id, selected: true}, c.name);
            } else {
              return m("option", {value: c.id}, c.name);
            }
          })
        )
      );
    }

    return m("fieldset", [
      m("div", {class: "flex"}, nameFields),
      m("div", {class: "flex"}, noteFields),
      m("div", {class: "flex"}, clusterFields),
      m("div", {class: "flex"}, this.getButtons()),
    ]);
  },

  getButtons: function() {
    console.log(Cluster);
    let myButtons = [];
    if (hasPermission('post:servers') || hasPermission('patch:servers')) {
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
    if (hasPermission('delete:servers') && Server.current.id) {
      myButtons.push(
        m("button.button[type=button]", {
          class: "pseudo small",
          onclick: function() {
            if (window.confirm("Are you sure you want to delete this?")) {
              return m.request({
                method: "DELETE",
                url: "https://cs-monitor.herokuapp.com/api/v1.0/servers/" + Server.current.id,
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

export {ServerForm};
