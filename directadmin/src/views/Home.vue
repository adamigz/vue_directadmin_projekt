<template>
<b-container fluid class="mt-4">
  <b-row>
    <b-col cols="8">
      <b-container class="pl-0 pr-0">
        <b-card>
          <h3>Sample text</h3>
          <hr>
          <h5>Sample text</h5>
        </b-card>
      </b-container>
    </b-col>
    <b-col cols="4">
      <b-container class="pl-0 pr-0" fluid>
          <progress-bar :show="loaded" :max="quota.max" :value="quota.value">Disk Usage</progress-bar>
          <progress-bar :show="loaded" :max="bandwidth.max" :value="bandwidth.value" class="mt-4">Bandwidth</progress-bar>
          <b-card class="mt-4">
            <h3>Server features</h3>
            <hr>
            <b-row class="pl-3 pr-3">
              <h5>Emails : </h5><h5 class="ml-auto">{{email.value}} / {{email.max}}</h5>
            </b-row>
            <b-row class="pl-3 pr-3">
              <h5>Databases : </h5><h5 class="ml-auto">{{database.value}} / {{database.max}}</h5>
            </b-row>
            <b-row class="pl-3 pr-3">
              <h5>FTP accounts : </h5><h5 class="ml-auto">{{ftp.value}} / {{ftp.max}}</h5>
            </b-row>
            <b-row class="pl-3 pr-3">
              <h5>Inode : </h5><h5 class="ml-auto">{{inode.value}} / {{inode.max}}</h5>
            </b-row>
          </b-card>
      </b-container>
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
      loaded: true
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
    },
    email() {
      return {
        value: this.$store.state.data.USEREMAIL,
        max: this.$store.state.data.USEREMAILMAX
      }
    },
    database() {
      return {
        value: this.$store.state.data.USERDATABASE,
        max: this.$store.state.data.USERDATABASEMAX
      }
    },
    ftp() {
      return {
        value: this.$store.state.data.USERFTP,
        max: this.$store.state.data.USERFTPMAX
      }
    },
    inode() {
      return {
        value: this.$store.state.data.USERINODE,
        max: this.$store.state.data.USERINODEMAX
      }
    }
  },
  async mounted() {
    await this.getUserData();
    this.loaded = false;
  }
}
</script>
