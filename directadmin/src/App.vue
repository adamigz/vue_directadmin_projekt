<template>
  <div id="app">
    <div v-if="loggedIn">
      <b-jumbotron header-level="4">
        <template #header>
          <router-link to="/" tag="h1" class="title">DirectAdmin</router-link>
          
              // TODO: Make profile managment icons 
          

        </template>
        <hr class="my-4">
        
              // TODO: Make navbar (components)

      </b-jumbotron>
      <router-view></router-view>
    </div>

    <div v-else>   
      <b-container>
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
      </b-container>
    </div> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loggedIn: false,
      isLogging: false
    }
  },
  methods: {
    async login() {
      this.isLogging = true;
      try {
        await axios.post('http://172.20.10.3:8080/LOGIN', `username=${this.username}&password=${this.password}`)
        .then((response) => {
          console.log(response.data);
        });
      } catch (error) {
        console.log("----------");
        console.log(error);
        console.log("----------");
      }
      
    }
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
