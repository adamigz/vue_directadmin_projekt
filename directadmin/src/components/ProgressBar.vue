<template>
    <b-overlay :show="show" rounded="lg">
        <b-card>
            <b-card-title><slot></slot></b-card-title>
            <b-progress :max="max" :value="value" precision="3"></b-progress>
        </b-card>
    </b-overlay>
</template>

<script>
export default {
    name: 'ProgressBar',
    data(){
        return {
            show: false
        }
    },
    props: {
        max: {
            required: true,
            type: Number
        }, 
        value: {
            required: true,
            type: Number
        }
    }
}
</script>

<style>

</style>