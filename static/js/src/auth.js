import createAuth0Client from '@auth0/auth0-spa-js';

// vars
let auth0 = null;
let environment = {
  domain: "dev-us1d520w.us.auth0.com",
  audience: "https://cs-monitor.herokuapp.com",
  clientId: "THLnI4SjTwYduH5sGfzHjAR37agGeL10",
  callbackURL: "https://cs-monitor.herokuapp.com#!/login"
};
// var environment = null;


// functions
const fetchAuthConfig = function() {
  fetch("../auth_config.json");
}

const configureClient = async function() {
  if (environment === null) {
    // const response = await fetchAuthConfig();
    // environment = await response.json();
  }

  auth0 = await createAuth0Client({
    domain: environment.domain,
    client_id: environment.clientId,
    audience: environment.audience
  });
}

const login = async function() {
  await auth0.loginWithRedirect({
    redirect_uri: environment.callbackURL
  });
}

const logout = function() {
  auth0.logout({
    returnTo: window.location.origin
  });
}

const userDetails = async function() {
  return JSON.stringify(await auth0.getUser());
}

export {auth0, logout, login, configureClient, userDetails};
