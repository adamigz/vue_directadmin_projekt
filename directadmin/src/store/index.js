import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    username: '',
    data: {},
    activeDomain: ''
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
      state.activeDomain = perk;
    },
    setData(state, perk){
      state.data = perk;
    }
  },
  actions: {
    async login(ctx, payload){
      try {
        await axios.post('https://192.168.8.101:8080/API/LOGIN', payload)
        .then((response) => {
          //console.log(response);
          ctx.commit('setUsername', response.data.username);
          ctx.state.loggedIn = true;
          try{
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
    },
    async userData(ctx){
      try {
        let temp = await axios.get(`https://192.168.8.101:8080/API?json=yes&initial=yes&request=global&show_extra=yes`)
        .then((res) => {
          return res.data;
        });
        if(ctx.state.activeDomain == ''){
          ctx.commit('setDomain', temp.DEFAULT_DOMAIN);
        }
        return temp;
      } catch (error) {
        console.log(error);
      }
    },
    async createDomain(ctx, payload) {
      try {
        await axios.post(`/CREATE_DOMAIN?${payload}`);
      } catch (e) {
        console.log(e);
      }
    }
  },
  modules: {
  }
})
