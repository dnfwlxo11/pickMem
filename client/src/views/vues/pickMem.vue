<template>
    <div class="pick-mem h-100">
        <div class="content" style="overflow-y: auto;">
            <nav-bar class="nav" :msg="msg[step]" @on-next="nextStep" @on-previous="previousStep" :step="step"></nav-bar>
            <div class="body container">
                <step-one :class="{'moveFromRight': currDirection == 'right', 'moveFromLeft': currDirection == 'left'}" class="step-0" v-if="step==0"></step-one>
                <step-two :class="{'moveFromRight': currDirection == 'right', 'moveFromLeft': currDirection == 'left'}" class="step-1" v-else-if="step==1"></step-two>
                <step-three :class="{'moveFromRight': currDirection == 'right', 'moveFromLeft': currDirection == 'left'}" class="step-2" v-else-if="step==2"></step-three>
                <step-four :class="{'moveFromRight': currDirection == 'right', 'moveFromLeft': currDirection == 'left'}" class="step-3" v-else-if="step==3"></step-four>
                <step-five :class="{'moveFromRight': currDirection == 'right', 'moveFromLeft': currDirection == 'left'}" class="step-4" v-else-if="step==4"></step-five>
                <step-result :class="{'moveFromRight': currDirection == 'right', 'moveFromLeft': currDirection == 'left'}" class="step-5" v-else @on-previous="previousStep"></step-result>
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
            currDirection: 'right'
        }
    },
    methods: {
        nextStep() {
            let canNext = this.$store.getters.getNext;

            this.currDirection = 'right';

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
            this.currDirection = 'left';

            if (this.step == 0) this.$router.push('/');

            this.step -= 1;
        },
    },
}
</script>

<style lang="scss">

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

.moveFromRight {
    animation: moveFromRight 1s ease both;

    @keyframes moveFromRight {
        from { 
            transform: translateX(100%);
        }
    }   
}

.moveFromLeft {
    animation: moveFromLeft 1s ease both;

    @keyframes moveFromLeft {
        from { 
            transform: translateX(-100%);
        }
    }
}
</style>