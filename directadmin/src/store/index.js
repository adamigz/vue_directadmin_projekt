import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    username: '',
    domain: '',
    domains: []
  },
  mutations: {
    setUsername(state, perk) {
      state.username = perk;
    },
    logout(state){
      state.loggedIn = false;
      state.username = '';
    },
    setDomain(state, perk){
      state.domain = perk;
    }
  },
  actions: {
    async login(ctx, payload){
      try {
        await axios.post('https://192.168.8.101:8080/API/LOGIN', payload)
        .then((response) => {
          console.log(response);
          ctx.commit('setUsername', response.data.username);
          ctx.state.loggedIn = true;
          try{
            let d = axios(`https://192.168.8.101:8080/API/GET_USER_DATA?user=${response.data.username}`);
            ctx.state.domains = d;
            localStorage.setItem('loginData', payload);
          } catch(e){
            console.log(e);
          }
          
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
