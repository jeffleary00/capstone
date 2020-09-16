const m = require("mithril");
import {token} from "../auth";

let Cluster = {
  list: [],
  current: {},

  loadList: function(jwt=token) {
    let opts = {
      method: "GET",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/clusters",
      responseType: "json",
      headers: {"Authorization": "Bearer " + jwt, "Content-Type": "application/json"}
    }
    return m.request(opts).then(function(result) {
      Cluster.list = result.clusters;
    })
  },

  load: function(id, jwt=token) {
    let opts = {
      method: "GET",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/clusters/" + id,
      responseType: "json",
      headers: {"Authorization": "Bearer " + jwt, "Content-Type": "application/json"}
    }
    return m.request(opts).then(function(result) {
        Cluster.current = result.clusters;
      })
  },

  save: function(jwt=token) {
    let opts = {
      method: "POST",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/clusters",
      responseType: "json",
      body: Cluster.current,
      headers: {"Authorization": "Bearer " + jwt, "Content-Type": "application/json"}
    }
    if (Cluster.current.id) {
      opts.method = "PUT"
      opts.url = "https://cs-monitor.herokuapp.com/api/v1.0/clusters/" + Cluster.current.id
    }
    return m.request(opts).then(function(result) {
      console.log(result.status, result.body);
    })
  }
}

export {Cluster};
