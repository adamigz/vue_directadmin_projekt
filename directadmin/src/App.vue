<template>
  <div id="app">
    <div v-if="loggedIn">
      <div>
        <b-navbar toggleable="sm" type="light" variant="light">
          <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-button class="mr-2" variant="primary-outline" v-b-toggle.sidebar>
              <b-icon-grid3x3-gap-fill variant="primary" @mouseenter="scale += 0.3" @mouseleave="scale -= 0.3" :scale="scale"></b-icon-grid3x3-gap-fill>
            </b-button>
            
            <router-link to="/" class="title"><b-navbar-brand><h1 class="mb-0" >DirectAdmin</h1></b-navbar-brand></router-link>

          <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-dropdown right variant="outline-primary">
                  <template #button-content>
                    {{ domain }}
                  </template>
                    <div v-for="d in domains" :key="d">
                      <b-dropdown-item @click="changeDomain(d)">{{ d }}</b-dropdown-item>
                    </div>
                </b-dropdown>
                
                <b-nav-text class="ml-5 text-dark"><b-icon-person-circle scale="1.5" class="mr-2">
                  
                    </b-icon-person-circle>
                    <router-link to="/user">{{ loggedUsername }}</router-link>
                    </b-nav-text>
                  
                <b-button @click="logout()" class="ml-5" variant="danger"><b-icon icon="power"></b-icon></b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <b-container>
        
        <b-sidebar backdrop backdrop-variant="dark" shadow id="sidebar" title="Menu">
          <div class="px-3 py-2">
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
          </div>
        </b-sidebar>
        
      </b-container>
      <router-view></router-view>
    </div>

    <div v-else>   
      <b-container>
        <div v-if="!isLogging">
          <div v-if="error">
            <b-row align-h="center">
              <h2 class="text-danger">{{ errorMsg }}</h2>
            </b-row>
          </div>
          <b-row align-h="center">
            <label for="username">name: </label>
            <b-form-input id="username" type="text" v-model="username"></b-form-input>
          </b-row>
          <b-row align-h="center">
            <label for="password">password: </label>
            <b-form-input id="password" type="password" v-model="password"></b-form-input>
          </b-row>
          <br>
          <b-row align-h="center">
            <b-button @click="login()" size="lg" variant="success">login</b-button>
          </b-row>
        </div>
        <div v-else>
          <b-container>
            <b-row class="mt-auto" align-h="center">
              <b-icon icon="arrow-clockwise" animation="spin" font-scale="4"></b-icon>              
            </b-row>
          </b-container>
        </div>
      </b-container>
    </div> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: false,
      errorMsg: 'Nie udało się zalogować, spróbuj ponownie!',
      username: '',
      password: '',
      isLogging: false,
      scale: 1.5
    }
  },
  methods: {
      async login() {
      this.error = false;
      this.isLogging = true;
      await this.$store.dispatch('login', `username=${this.username}&password=${this.password}&json=yes`);
      if(this.loggedIn){
        this.isLogging = false;
      } else {
        this.isLogging = false;
        this.error = true;
        this.username = '';
        this.password = '';
      }
    },
    async logout() {
      await this.$store.commit('logout');
      localStorage.removeItem('loginData');
      this.$router.push('/')
    },
    changeDomain(payload){
      this.$store.commit('setDomain', payload);
    },
    getUserData(){
      let d = this.$store.dispatch('userData');
      d.then((res) => {
        this.$store.commit('setData', res);
      })
    }
  },
  computed: {
    loggedIn: function() {
      return this.$store.state.loggedIn;
    },
    loggedUsername: function() {
      return this.$store.state.username;
    },
    domain() {
      return this.$store.state.activeDomain;
    },
    domains() {
      return this.$store.state.data.DOMAIN_LIST;
    }
  },
  beforeMount() {
    if(localStorage.getItem('loginData')){
      this.$store.dispatch('login', localStorage.getItem('loginData'));
    }
  },
  mounted() {
    this.getUserData();
  }
}

</script>

<style scoped>
.title:hover {
  cursor: pointer;
}
.title {
  width:max-content;
}
</style>
