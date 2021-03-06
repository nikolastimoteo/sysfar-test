import Vue from "vue";

/**
 * Sends a GET request for getting the clients [PER PAGE].
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @param  {int} page
 * @return {Promise}
 */
function list(page) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`clients?page=${page}`)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

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

/**
 * Sends a GET request for getting a client by its ID.
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @param  {int} id 
 * @return {Promise}
 */
function getById(id) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`clients/${id}`)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Sends a PUT request for updating a client.
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @param  {int} id
 * @param  {string} name
 * @param  {string} email
 * @param  {string} birth_date 
 * @param  {string} phone 
 * @return {Promise}
 */
function update(id, name, email, birth_date, phone) {
  return new Promise((resolve, reject) => {
    Vue.axios.put(`clients/${id}`, {
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

/**
 * Sends a DELETE request for deleting a client.
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @param  {int} id 
 * @return {Promise}
 */
function destroy(id) {
  return new Promise((resolve, reject) => {
    Vue.axios.delete(`clients/${id}`)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Sends a GET request for searching clients.
 * 
 * @author Níkolas Timóteo <nikolastps@hotmail.com>
 * @param  {string} query 
 * @param  {int} page 
 * @return {Promise}
 */
function search(query, page) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`clients/search?query=${query}&page=${page}`)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  list,
  store,
  getById,
  update,
  destroy,
  search
}