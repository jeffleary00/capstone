const m = require("mithril");
import {token} from "../auth";

let Cluster = {
  list: [],
  current: {},

  loadList: function(jwt=token) {
    console.log(jwt);

    let opts = {
      method: "GET",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/clusters",
      responseType: "json"
    }
    if (jwt !== null) {
      let key = "Authorization";
      let value = "Bearer " + jwt;
      opts.headers = {key: value};
    }
    return m.request(opts).then(function(result) {
      console.log(result);
      Cluster.list = result.clusters;
    })
  },

  load: function(id, jwt=token) {
    console.log(jwt);

    let opts = {
      method: "GET",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/clusters/" + id,
      responseType: "json"
    }
    if (jwt !== null) {
      let key = "Authorization";
      let value = "Bearer " + jwt;
      opts.headers = {key: value};
    }
    return m.request(opts).then(function(result) {
        Cluster.current = result.clusters;
      })
  },

  save: function(jwt=token) {
    console.log(jwt);

    let opts = {
      method: "POST",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/clusters",
      responseType: "json",
      body: Cluster.current,
    }
    if (jwt !== null) {
      let key = "Authorization";
      let value = "Bearer " + jwt;
      opts.headers = {key: value};
    }
    if (Cluster.current.id) {
      opts.method = "PUT"
      opts.url = "https://cs-monitor.herokuapp.com/api/v1.0/clusters/" + Cluster.current.id
    }
    return m.request(opts).then(function(result) {
      console.log(obj.extract(result));
      console.log(result.status, result.body);
    })
  }
}

export {Cluster};
