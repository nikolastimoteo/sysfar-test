import Vue from "vue";

/**
 * Sends a POST request for creating a new client.
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @param  {string} name 
 * @param  {string} email 
 * @param  {string} birth_date 
 * @param  {string} phone 
 * @return {Promise}
 */
function store(name, email, birth_date, phone) {
  return new Promise((resolve, reject) => {
    Vue.axios.post("clients", {
        name,
        email,
        birth_date,
        phone
      })
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  store
}