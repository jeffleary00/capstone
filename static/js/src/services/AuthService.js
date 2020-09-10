const JWTS_LOCAL_KEY = 'CAPSTONE_MONITOR_LOCAL_KEY';
const JWTS_ACTIVE_INDEX_KEY = 'CAPSTONE_MONITOR_ACTIVE_INDEX_KEY';

class AuthService {
  constructor() {
    this._token = null;
    this._payload = null;
  }

  isAuthenticated() {
    if (this._token) {
      return true;
    } else {
      return false;
    }
  }

  hasPermission(p) {
    return this._payload && this._payload.permissions && this._payload.permissions.length && this._payload.permissions.indexOf(p) >= 0;
  }

  loadJwts() {
    this._token = localStorage.getItem(JWTS_LOCAL_KEY) || null;
    if (this._token) {
      this.decodeJWT(this._token);
    }
  }

  setJwt() {
    localStorage.setItem(JWTS_LOCAL_KEY, this._token);
    if (this._token) {
      this.decodeJWT(this._token);
    }
  }

  activeJWT() {
    return this._token;
  }

  checkTokenFragment() {
    const fragment = window.location.hash.substr(1).split('&')[0].split('=');
    if ( fragment[0] === 'access_token' ) {
      this._token = fragment[1];
      this.setJwt();
    }
  }

  decodeJWT(token) {
    /* const jwtservice = new JwtHelperService();
    this.payload = jwtservice.decodeToken(token);
    return this.payload; */
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map((c)=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    this._payload = JSON.parse(base64);
    return this._payload;
  }

  logout() {
    this._token = '';
    this._payload = null;
    this.setJwt();
  }
}

module.exports = AuthService;
