<template>
<b-container fluid class="mt-4">
  <b-col cols="8">

  </b-col>
  <b-col cols="4">
    <b-container class="pl-0 pr-0" fluid>
        <progress-bar :show="loaded" :max="quota.max" :value="quota.value">Disk Usage</progress-bar>
        <progress-bar :show="loaded" :max="bandwidth.max" :value="bandwidth.value" class="mt-4">Bandwidth</progress-bar>
    </b-container>
  </b-col>
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
      loaded: false
    }
  },
  methods: {
    getUserData(){
      let d = this.$store.dispatch('userData');
      d.then((res) => {
        this.$store.commit('setData', res);
      })
    }
  },
  computed: {
    quota() {
      return {
        value: this.$store.state.data.USERQUOTA,
        max: this.$store.state.data.USERQUOTAMAX
      }
    },
    bandwidth() {
      return {
        value: this.$store.state.data.USERBANDWIDTH,
        max: this.$store.state.data.USERBANDWIDTHMAX
      }
    }
  },
  async mounted() {
    await this.getUserData();
    this.loaded = true;
  }
}
</script>
