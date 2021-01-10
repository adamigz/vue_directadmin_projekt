import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    session: null
  },
  mutations: {
  },
  actions: {
    login: ({state}, payload) => {
      try {
        axios.post('http://192.168.8.101:8080/API/LOGIN', payload)
        .then((response) => {
          console.log(response);
        })
      } catch (error) {
        console.log("----------");
        console.log(error);
        console.log("----------");
      }
    }
  },
  modules: {
  }
})
