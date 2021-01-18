<template>
    <b-overlay :show="show" rounded="lg">
        <b-card>
            <h3><slot></slot></h3>
            <div v-if="details || max=='unlimited'" @mouseenter="details = !details" @mouseleave="details = !details">
                <b-progress :variant="variant" :max="maxValue" :value="value" height="1.5rem" precision="3">
                    <b-progress-bar :value="max">
                        <span><strong>{{ value }} MB / {{ max }} MB</strong></span>
                    </b-progress-bar>
                </b-progress> 
            </div>
            <div v-else @mouseenter="details = !details" @mouseleave="details = !details">
                <b-progress :variant="variant" :max="maxValue" :value="value" height="1.5rem" precision="3">
                </b-progress>
            </div>
        </b-card>
    </b-overlay>
</template>

<script>
export default {
    name: 'ProgressBar',
    data(){
        return {
            details: false
        }
    },
    props: {
        max: {
            required: true
        }, 
        value: {
            required: true
        },
        show: {
            required: true
        }
    },
    computed: {
        variant(){
            let t = (this.value/this.max)*100;
            if (t<=50 || this.max=='unlimited') {
                return "success";
            } else if(t<=75 && t>50) {
                return "warning";
            } else {
                return "danger";
            }
        },
        maxValue() {
            if(this.max=='unlimited'){
                return this.value;
            } else {
                return this.max;
            }
        }
    }
}
</script>

<style>

</style>