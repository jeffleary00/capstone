const m = require("mithril");

var Cluster = {
  list: [],
  current: {},

  loadList: function() {
      return m.request({
          method: "GET",
          url: "http://127.0.0.1:5000/api/v1.0/clusters",
          // withCredentials: true,
      })
      .then(function(result) {
        console.log(result);
          Cluster.list = result.clusters
      })
  },

  load: function(id) {
    return m.request({
          method: "GET",
          url: "http://127.0.0.1:5000/api/v1.0/clusters/" + id,
          // withCredentials: true
      }).then(function(result) {
        Cluster.current = result.clusters
      })
  },

  save: function() {
    obj = {
        method: "POST",
        url: "http://127.0.0.1:5000/api/v1.0/clusters",
        body: Cluster.current,
        // withCredentials: true,
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    }

    if (Cluster.current.id) {
      obj.method = "PUT"
      obj.url = "http://127.0.0.1:5000/api/v1.0/clusters/" + Cluster.current.id
    }

    return m.request(obj).then(function(result) {
      console.log(result.status, result.body)
    })
  }
}

module.exports = Cluster
