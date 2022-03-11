<template>
    <div class="pick-mem">
        <div class="container mt-5 mb-5">
            <div class="layout m-auto">
                <div>
                    <step-one v-if="step==0" @on-next="nextStep" @on-previous="previousStep"></step-one>
                    <step-two v-else-if="step==1" @on-next="nextStep" @on-previous="previousStep"></step-two>
                    <step-three v-else-if="step==2" @on-next="nextStep" @on-previous="previousStep"></step-three>
                    <step-four v-else-if="step==3" @on-next="nextStep" @on-previous="previousStep"></step-four>
                    <step-five v-else-if="step==4" @on-next="nextStep" @on-previous="previousStep"></step-five>
                    <step-result v-else @on-previous="previousStep"></step-result>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import stepOne from '../steps/stepOne.vue';
import stepTwo from '../steps/stepTwo.vue';
import stepThree from '../steps/stepThree.vue';
import stepFour from '../steps/stepFour.vue';
import stepFive from '../steps/stepFive.vue';
import stepResult from '../steps/stepResult.vue';

export default {
    name: 'PickMem',
    components: {
        stepOne,
        stepTwo,
        stepThree,
        stepFour,
        stepFive,
        stepResult,
    },
    data() {
        return {
            step: 0,
        }
    },
    methods: {
        nextStep() {
            if (this.step == 5) return;
            if (this.step == 1 && Object.keys(this.$store.getters.getImages).length < 6) return; 
            this.step += 1;
        },

        previousStep() {
            if (this.step == 0) return;
            this.step -= 1;
        },
    },
}
</script>

<style scoped>
</style>