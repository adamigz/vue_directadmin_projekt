import Vue from 'vue'
import Vuex from 'vuex'
import "../plugins/axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null
  },
  mutations: {
    setSession(state, perk){
      state.session = perk;
    }
  },
  actions: {
    login: (ctx, perk) => {
      try {
        axios.post('http://172.20.10.3:8080/API/LOGIN', `username=${perk.username}&password=${perk.password}`)
        .then((response) => {
          console.log(response);
        });
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
