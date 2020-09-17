const m = require("mithril");
import {token} from "../auth";

let Server = {
  list: [],
  current: {},

  loadList: function(jwt=token) {
    let opts = {
      method: "GET",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/servers",
      responseType: "json",
      headers: {"Authorization": "Bearer " + jwt, "Content-Type": "application/json"}
    }
    return m.request(opts).then(function(result) {
      Server.list = result.servers;
    })
  },

  load: function(id, jwt=token) {
    let opts = {
      method: "GET",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/servers/" + id,
      responseType: "json",
      headers: {"Authorization": "Bearer " + jwt, "Content-Type": "application/json"}
    }
    return m.request(opts).then(function(result) {
        Server.current = result.servers[0];
      })
  },

  save: function(jwt=token) {
    let opts = {
      method: "POST",
      url: "https://cs-monitor.herokuapp.com/api/v1.0/servers",
      responseType: "json",
      body: Server.current,
      headers: {"Authorization": "Bearer " + jwt, "Content-Type": "application/json"}
    }
    if (Server.current.id) {
      opts.method = "PATCH"
      opts.url = "https://cs-monitor.herokuapp.com/api/v1.0/servers/" + Server.current.id
    }
    return m.request(opts).then(function(result) {
      console.log(result.status, result.body);
    })
  }
}

export {Server};
