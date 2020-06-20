import Vue from "vue";

/**
 * Sends a POST request for logging a user in.
 *
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @param {string} email
 * @param {string} password
 * @return {Promise}
 */
function login(email, password) {
  return new Promise((resolve, reject) => {
    Vue.axios
      .post("auth/login", {
        email: email,
        password: password
      })
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Sends a GET request for getting the authenticated user.
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @return {Promise}
 */
function getUser() {
  return new Promise((resolve, reject) => {
    Vue.axios.get("auth/user")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Sends a POST request for logging a user out.
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @return {Promise}
 */
function logout() {
  return new Promise((resolve, reject) => {
    Vue.axios.post("auth/logout")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  login,
  logout,
  getUser
}