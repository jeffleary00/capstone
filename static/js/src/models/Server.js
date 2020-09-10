var Server = {
  list: [],
  current: {},

  loadList: function() {
      return m.request({
          method: "GET",
          url: "http://127.0.0.1:5000/api/v1.0/servers",
          withCredentials: true,
      })
      .then(function(result) {
          Server.list = result.servers
      })
  },

  load: function(id) {
    return m.request({
          method: "GET",
          url: "http://127.0.0.1:5000/api/v1.0/servers/" + id,
          withCredentials: true
      }).then(function(result) {
        Server.current = result.servers
      })
  },

  save: function() {
    obj = {
        method: "POST",
        url: "http://127.0.0.1:5000/api/v1.0/servers",
        data: Server.current,
        withCredentials: true,
        extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
    }

    if (Server.current.id) {
      obj.method = "PUT"
      obj.url = "http://127.0.0.1:5000/api/v1.0/servers/" + Server.current.id
    }

    return m.request(obj).then(function(result) {
      console.log(result.status, result.body)
    })
  },
}
