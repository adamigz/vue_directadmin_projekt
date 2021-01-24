<template>
    <b-container class="mt-4">
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
                ssl: true,
                php: true,
                cgi: false
            }
        }
    },
    methods: {
        send(event) {
            event.preventDefault();
            let res = this.$store.dispatch('createDomain', 'json=yes&action=create&domain=apirequest.com&bandwidth=200&quota=500&ssl=ON&cgi=ON&php=ON')
            .then((res) => {
                return res.result;
            });
            if (res != "Domain Created Successfully") {
                console.log('błąd');
            }
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
