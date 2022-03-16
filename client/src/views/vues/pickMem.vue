<template>
    <div class="pick-mem">
        <nav-bar :msg="msg[step]" @on-next="nextStep" @on-previous="previousStep"></nav-bar>
        <div class="container">
            <div class="">
                <step-one v-if="step==0"></step-one>
                <step-two v-else-if="step==1"></step-two>
                <step-three v-else-if="step==2"></step-three>
                <step-four v-else-if="step==3"></step-four>
                <step-five v-else-if="step==4"></step-five>
                <step-result v-else @on-previous="previousStep"></step-result>
            </div>
        </div>
        <footer-bar></footer-bar>
    </div>    
</template>

<script>
import navBar from '../../components/nav.vue'
import footerBar from '../../components/footer.vue'
import stepOne from '../steps/stepOne.vue';
import stepTwo from '../steps/stepTwo.vue';
import stepThree from '../steps/stepThree.vue';
import stepFour from '../steps/stepFour.vue';
import stepFive from '../steps/stepFive.vue';
import stepResult from '../steps/stepResult.vue';

export default {
    name: 'PickMem',
    components: {
        navBar,
        footerBar,
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
            msg: [
                '액자를 골라보세요!',
                '가장 멋있고 예쁘게 찍어보세요',
                '어렵겠지만 몇 개만 골라주세요',
                '마음가는 대로 액자를 꾸며봐요!',
                '이번에는 사진을 꾸며볼까요',
                '마음에 드시나요?'
            ],
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