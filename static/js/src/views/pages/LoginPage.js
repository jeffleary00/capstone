const m = require("mithril");
const AuthService = require("../../services/AuthService");
const environment = {
  apiServerUrl: 'https://cs-monitor.herokuapp.com',
  auth0: {
    url: 'dev-us1d520w.us.auth0.com',
    audience: 'https://cs-monitor.herokuapp.com',
    clientId: 'THLnI4SjTwYduH5sGfzHjAR37agGeL10', // test app
    //clientId: '1XMqKvqO5JYM8GNh1oEl28voSfef8EKa', // production app
    callbackURL: 'https://cs-monitor.herokuapp.com#!/login',
  }
};

const loginLink = function(callbackPath = '') {
  let link = 'https://';
  link += environment.auth0.url;
  link += '/authorize?';
  link += 'audience=' + environment.auth0.audience + '&';
  link += 'response_type=token&';
  link += 'client_id=' + environment.auth0.clientId + '&';
  link += 'redirect_uri=' + environment.auth0.callbackURL + callbackPath;
  return link;
}

module.exports = {
  view: function() {
    auth = new AuthService();
    auth.checkTokenFragment();
    if (auth.isAuthenticated()) {
      m.route.set("/");
    } else {
      console.log("redirect link: " + loginLink());
      Response.redirect(loginLink());
    }
  }
}
