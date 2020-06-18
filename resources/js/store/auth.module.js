import authService from "../services/auth.service";

export const auth = {
    namespaced: true,
    state: {
      token: localStorage.getItem("user-token") || "",
      user: {}
    },
    mutations: {
      set_token(state, token) {
        state.token = token;
      },
      reset_state(state) {
        state.token = "";
        state.user = {};
      },
      set_user(state, user) {
        state.user = user;
      }
    },
    actions: {
      login({ commit }, user) {
        return new Promise((resolve, reject) => {
          authService
            .login(user.email, user.password)
            .then(resp => {
              const token = resp.data.access_token;
              localStorage.setItem("user-token", token);
              commit("set_token", token);
              resolve(resp);
            })
            .catch(err => {
              commit("reset_state");
              localStorage.removeItem("user-token");
              reject(err);
            });
        });
      },
      getUser({ commit }) {
        return new Promise((resolve, reject) => {
          authService
            .getUser()
            .then(resp => {
              const user = resp.data.user;
              commit("set_user", user);
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      logout({ commit }) {
        return new Promise((resolve, reject) => {
          authService
            .logout()
            .then(resp => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            })
            .finally(() => {
              localStorage.removeItem("user-token");
              commit("reset_state");
            });
        });
      }
    },
    getters: {
      isLoggedIn: state => !!state.token,
      authUser: state => state.user
    }
  };