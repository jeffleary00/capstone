const m = require("mithril");
const AuthService = require("../../services/AuthService");
const environment = {
  apiServerUrl: 'https://cs-monitor.herokuapp.com',
  auth0: {
    url: 'dev-us1d520w.us.auth0.com',
    audience: 'Monitor-API',
    clientId: '1XMqKvqO5JYM8GNh1oEl28voSfef8EKa',
    callbackURL: 'https://cs-monitor.herokuapp.com/login',
  }
};
const loginLink = function(callbackPath = '') {
  let link = 'https://';
  link += environment.url;
  link += '/authorize?';
  link += 'audience=' + environment.audience + '&';
  link += 'response_type=token&';
  link += 'client_id=' + environment.clientId + '&';
  link += 'redirect_uri=' + environment.callbackURL + callbackPath;
  return link;
}

module.exports = {
  view: function() {
    Auth.checkTokenFragment();
    if (Auth.isAuthenticated()) {
      m.route.set("/");
    } else
      m.route.set(loginLink());
    }
}
