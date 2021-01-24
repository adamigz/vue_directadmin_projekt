<template>
    <b-container class="mt-4">
        <b-card>
            <h3>Create a new domain</h3>
            <hr>
            <b-form @submit="send" @reset="onReset">
                <b-row>
                    <b-col cols="2">
                        <h5 class="mt-1">
                            Domain name
                        </h5>
                    </b-col>
                    <b-col cols="10">
                        <b-form-input v-model="form.domain" placeholder="domain.com"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6">
                        <b-col cols="4">
                            <h5 class="mt-1">
                                Bandwidth
                            </h5>
                        </b-col>
                        <b-col cols="8">
                            <b-form-input v-model="form.bandwidth" placeholder="1000"></b-form-input>
                        </b-col>
                    </b-col>
                    <b-col cols="6">
                        <b-col cols="4">
                            <h5 class="mt-1">
                                Disk space
                            </h5>
                        </b-col>
                        <b-col cols="8">
                            <b-form-input v-model="form.quota" placeholder="1000"></b-form-input>
                        </b-col>
                    </b-col>
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
                php: true
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