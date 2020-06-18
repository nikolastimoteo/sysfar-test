import authService from "../services/auth.service";

export const authentication = {
    state: {
      token: localStorage.getItem("user-token") || ""
    },
    mutations: {
      set_token(state, token) {
        state.token = token;
      },
      reset_state(state) {
        state.token = "";
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
      }
    },
    getters: {
      isLoggedIn: state => !!state.token
    }
  };