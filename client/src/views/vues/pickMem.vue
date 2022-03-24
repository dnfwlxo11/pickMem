<template>
    <div class="pick-mem h-100">
        <div class="content" style="overflow-y: auto;">
            <nav-bar class="nav" :msg="msg[step]" @on-next="nextStep" @on-previous="previousStep" :step="step"></nav-bar>
             <!-- style="height: calc(100% - 150px);" -->
            <div class="body container">
                <step-one class="step" v-if="step==0"></step-one>
                <step-two class="step" v-else-if="step==1"></step-two>
                <step-three class="step" v-else-if="step==2"></step-three>
                <step-four class="step" v-else-if="step==3"></step-four>
                <step-five class="step" v-else-if="step==4"></step-five>
                <step-result class="step" v-else @on-previous="previousStep"></step-result>
            </div>
        </div>
        <footer-bar class="footer"></footer-bar>
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
            let canNext = this.$store.getters.getNext;

            if (this.step == 0 && !canNext) {
                this.$Utils.toast('액자를 골라주세요.')
                return;
            } else if (this.step == 1 && !canNext) {
                this.$Utils.toast('사진이 부족합니다.')
                return;
            } else if (this.step == 2 && !canNext) {
                this.$Utils.toast('사진을 모두 골라주세요.')
                return;
            }

            if (this.step == 5 || !canNext) return;

            if (this.step == 1 && Object.keys(this.$store.getters.getImages).length < 6) return; 
            this.step += 1;
        },

        previousStep() {
            if (this.step == 0) this.$router.push('/');
            this.step -= 1;
        },
    },
}
</script>

<style scoped>
.body {
    margin-top: 100px;
}

.step {
    padding-bottom: 50px;
}

.nav {
    position: fixed;
    width: 100%;
    z-index: 1000;
    background-color: #FFF;
}

.content {
    height: 100%;
}

.footer {
    height: 50px;
    position : relative;
    background-color: #FFF;
    z-index: 1000;
    transform : translateY(-100%);
}

.custom-toast {
    background-color: red;
}
</style>