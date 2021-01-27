<template>
    <b-container class="mt-4">
        <b-container fluid v-if="errorAlert != 0" class="" style="z-index: 2; position: fixed; top: 1rem; margin-left: auto; ">
            <b-alert @dismissed="errorAlert=0" :show="errorAlert" variant="danger" style="z-index: 3; position: fixed">
                <h5 class="alert-heading">{{ errorValue }}</h5>
            </b-alert>
        </b-container>
        <b-card>
            <h3>Create a new domain</h3>
            <hr>
            <b-form @submit="send" @reset="onReset">
                <b-row class="mt-1">
                    <b-col cols="2">
                        <h5 class="mt-1">
                            Domain name
                        </h5>
                    </b-col>
                    <b-col cols="10">
                        <b-form-input v-model="form.domain" placeholder="domain.com"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-1">
                    <b-col cols="6" class="flex">
                            <h5 class="mt-1">
                                Bandwidth
                            </h5>
                            <b-form-input v-model="form.bandwidth" type="number" placeholder="1000"></b-form-input>
                    </b-col>
                    <b-col cols="6" class="flex">
                            <h5 class="mt-1">
                                Disk space
                            </h5>
                            <b-form-input v-model="form.quota" type="number" placeholder="1000"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2">
                    <b-col cols="4">
                      <b-form-checkbox v-model="form.ssl"/> SSL
                    </b-col>
                    <b-col cols="4">
                      <b-form-checkbox v-model="form.php"/> PHP
                    </b-col>
                    <b-col cols="4">
                      <b-form-checkbox v-model="form.cgi"/> CGI
                    </b-col>
                  </b-row>
                  <b-row align-h="between" class="mt-2">
                    <b-col cols="4"><b-button variant="danger" type="reset">Reset</b-button></b-col>
                    <b-col cols="4" class="p-0 d-flex"><b-button variant="success" type="submit" class="ml-auto mr-3">Create</b-button></b-col>
                  </b-row>
            </b-form>
        </b-card>
    </b-container>
</template>

<script>
export default {
    name: 'TheDomainCreateForm',
    data() {
        return {
            form: {
                domain: '',
                bandwidth: null,
                quota: null,
                ssl: false,
                php: false,
                cgi: false
            },
            pSsl: '',
            pPhp: '',
            pCgi: '',
            errorAlert: 0,
            errorValue: ''
        }
    },
    methods: {
        validate() {
            if (this.form.domain != '' && this.form.bandwidth != null && this.form.quota != null) {
                return true; 
            } else {
                return false;
            }
        },
        send(event) {
            event.preventDefault();
            this.parseBoolFormData();
            if(this.validate()) {
                let res = this.$store.dispatch('createDomain', `domain=${this.form.domain}&bandwidth=${this.form.bandwidth}&quota=${this.form.quota}&ssl=${this.pSsl}&cgi=${this.pCgi}&php=${this.pPhp}`);
                res.then((r) => {
                    if(r == undefined){
                        this.showAlert('Something went wrong with creating domain! Try again.');
                    }
                })
            } else {
                this.showAlert('You have empty fields in your form! Fill them.')
            }
            
        },
        showAlert(value) {
            this.errorValue = value;
            this.errorAlert = 5;
        },
        parseBoolFormData(){
            this.pSsl = this.form.ssl == true ? 'ON' : 'OFF';
            this.pPhp = this.form.php == true ? 'ON' : 'OFF';
            this.pCgi = this.form.cgi == true ? 'ON' : 'OFF';
        },
        onReset(event) {
            event.preventDefault();
            this.form = {
                domain: '',
                bandwidth: null,
                quota: null,
                ssl: true,
                php: true
            }
        }
    }
}
</script>

<style>

</style>
