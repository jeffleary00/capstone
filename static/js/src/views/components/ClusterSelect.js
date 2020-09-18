import {hasPermission} from "../../auth";
import {Cluster} from "../../models/Cluster";
const m = require("mithril");

const ClusterSelect = {
  oninit: function(vnode) {
    let self = this;
    self.target = vnode.attrs.target;
    Cluster.loadList();

    if (! self.target.clusterid) {
      self.target.cluster_id = Cluster.list[0].id;
    }

    Cluster.list.forEach(function(value, index, array) {
      if (value.id == self.clusterId) {
        self.selectedIndex = index;
      }
    })
  },

  view: function() {
    let self = this;
    return m("select", {
      selectedIndex: self.selectedIndex,
      onchange: function(e) {
        self.target.cluster_id = Number(e.target.value);
      }
    }, self.getOptions());
  },

  getOptions: function() {
    let self = this;
    if (hasPermission('post:servers')) {
      return Cluster.list.map(function(c) {
        if (self.clusterId == c.id) {
          return m("option", {value: c.id, selected: true}, c.name);
        } else {
          return m("option", {value: c.id}, c.name);
        }
      });
    } else {
      return Cluster.list.map(function(c) {
        if (self.clusterId == c.id) {
          return m("option", {value: c.id, selected: true, disabled: true}, c.name);
        } else {
          return m("option", {value: c.id, disabled: true}, c.name);
        }
      });
    }
  }
}

export {ClusterSelect};
