<template>
  <div class="container">
  <div class="card mt-4 py-3 px-3">
    <b-alert show v-if="alert != ''" @dismissed="alert=''" v-model="showAlert" :variant="alertVariant" dismissible>
      {{alert}}
    </b-alert>
    <table class="table table-striped mb-3">
      <thead>
        <tr>
          <th scope="col">Domain</th>
          <th scope="col">Bandwidth</th>
          <th scope="col">Disk Usage</th>
          <th scope="col">Subdomains</th>
          <th scope="col">Suspended</th>
          <th scope="col">Select</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(domain, index) in domains" :key="index">
          <div v-if="domain.defaultdomain=='yes'">
            <td><b>{{domain.domain}}</b></td>
          </div>
          <div v-else>
            <td>{{domain.domain}}</td>
          </div>
          <td>
            <div class="progress mt-1">
              <div class="progress-bar bg-success" role="progressbar" :style="{ width: fill(domain.bandwidth, domain.bandwidth_limit)}"> 
                <span v-if="domain.bandwidth_limit == 'unlimited'">
                  unlimited
                </span>
                <span v-else>
                    {{domain.bandwidth}}/{{domain.bandwidth_limit}}
                </span>
              </div>
            </div>
          </td>
          <td>
            <div class="progress mt-1">
              <div class="progress-bar bg-success" role="progressbar" :style="{ width: fill(domain.quota, domain.quota_limit)}">
                <span v-if="domain.quota_limit == 'unlimited'">
                  unlimited
                </span>
                <span v-else>
                    {{domain.quota}}/{{domain.quota_limit}}
                </span>
              </div>
            </div>
          </td>
          <td>{{subdomains(domain.subdomain)}}</td>
          <td>{{domain.suspended.toUpperCase()}}</td>
          <td><input type="checkbox" :value="domain.domain" v-model="checkedDomains" class="form-check-input"></td>
        </tr>
      </tbody>
    </table>
    <b-container>
      <b-row align-h="end">
        <b-button variant="outline-warning" class="mr-2" @click="setDefaultDomain()">Set as Default</b-button>
        <b-button variant="outline-warning" class="mr-2" @click="suspendSelectedDomains()">Suspend / Unsuspend</b-button>
        <b-button variant="outline-danger" @click="deleteSelectedDomains()">Delete</b-button>
      </b-row>
    </b-container>
    
  </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        domains: {},
        checkedDomains: [],
        showAlert: false,
        alert: '',
        alertVariant: 'danger'
      }
    },
    methods: {
      async getAllData() {
        let res = await this.$store.dispatch("getDomainsWithData");
        return res;
      },
      setDomains(payload) {
        this.domains = payload;
      },
      fill(val, max){
        return max == 'unlimited' ? '100%' : `${val/max}%`;
      },
      suspended(payload) {
        return payload == "yes" ? true : false;
      },
      subdomains(payload) {
        return payload == 0 ? 'NO' : payload;
      },
      deleteSelectedDomains() {
        if(this.checkedDomains.length != 0) {
          let queryString = '';
          this.checkedDomains.forEach((value, index) => {
            if(index+1 != this.checkedDomains.length){
              queryString += `select${index}=${value}&`;
            } else {
              queryString += `select${index}=${value}`;
            }
          });
          if(confirm('Are you sure about deleting this domains?')) {
            let res = this.$store.dispatch('deleteDomains', queryString);
            res.then((r) => {
              if(r.statusText == "OK") {
                this.domains = {};
                this.$store.dispatch('getDomainsWithData');
              } else {
                this.alertVariant = 'danger';
                this.alert = 'Something went wrong!';
                this.showAlert = true;
              }
            })
          } else {

          }
        } else {
          this.alertVariant = 'danger';
          this.alert = 'You must select at least one domain!';
          this.showAlert = true;
        }
        
      },
      suspendSelectedDomains() {
        if (this.checkedDomains.length != 0) {
          let queryString = '';

          for(var i = 0; i < this.checkedDomains.length; i++) {
            if(i == this.checkedDomains.length - 1){
              queryString += `select${i}=${this.checkedDomains[i]}`;
            }
            else{
              queryString += `select${i}=${this.checkedDomains[i]}&`;
            }
          }

          let res = this.$store.dispatch('suspendDomains', queryString);
          res.then((r) => {
            if(r.status == 200){
              window.location.reload();
            }else{
              this.alertVariant = 'danger';
              this.alert = 'Something went wrong';
              this.showAlert = true;
            }
          })
        } else {
          this.alertVariant = 'danger';
          this.alert = 'You must select at least one domain!';
          this.showAlert = true;
        }
      },
    setDefaultDomain(){
        if(this.checkedDomains.length == 1){
          let queryString = this.checkedDomains[0];
          let res = this.$store.dispatch('setDefaultDomain', queryString);
          res.then((r) =>{
            console.log(r);
            if(r.status == 200){
              window.location.reload();
            }else{
              this.alertVariant = 'danger';
              this.alert = 'Something went wrong';
              this.showAlert = true;
            }
          })
        } else {
            this.alertVariant = 'danger';
              this.alert = 'You have to select exactly one domain.';
              this.showAlert = true;
        }
    },
    
    },

    

    async mounted(){
      await this.getAllData().then((r) => {
        this.setDomains(r.data);
      });
      console.log(this.domains);
    }
  }
</script>
<style scoped>

</style>
