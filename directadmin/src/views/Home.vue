<template>
<b-container fluid class="mt-3">
  <b-row>
    <b-col cols="6">
      <progress-bar max="100" value="20">Disk Usage</progress-bar>
    </b-col>
    <b-col cols="6">
      <progress-bar max="500" value="340">Bandwidth</progress-bar>
    </b-col>
  </b-row>
</b-container>
  
</template>

<script>
import ProgressBar from "../components/ProgressBar";

export default {
  name: 'Home',
  components: {
    ProgressBar
  },
  data() {
    return {

    }
  },
  methods: {
    async getUserData(){
      
    }
  },
  beforeUpdate(){
    if(this.$store.state.loggedIn){
      
    }
  }
}
</script>
