<template>
    <div class="step-one text-center">
        <div class="mb-5 badge" style="font-size: 25px;">
            <small>프레임: {{targetFrame ? targetFrame : "선택 안함"}}</small>
        </div>
        <div class="mb-5">
            <div class="text-right mb-3">
                <strong>세로가 긴 액자는 4:3 비율, 가로가 긴 액자는 3:4 비율입니다.</strong>
            </div>
            <div class="text-left">
                <div class="mb-3 pl-3"><strong>2 Cuts</strong></div>
                <div class="mb-5 text-center">
                    <div class="row m-0">
                        <div class="col-md-6 mb-3 p-3 m-auto" :class="{ 'target': targetFrame == '1x2' }">
                            <img class="frame-vertical" src="@/assets/frame/1_2.png" @click="selectFrame('1x2')" draggable="false">
                        </div>
                        <div class="col-md-6 mb-3 p-3 m-auto" :class="{ 'target': targetFrame == '2x1' }">
                            <img class="frame-horizontal" src="@/assets/frame/2_1.png" @click="selectFrame('2x1')" draggable="false">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="mb-3 pl-3"><strong>3 Cuts</strong></div>
                <div class="mb-5 text-center">
                    <div class="row m-0">
                        <div class="col-md-6 mb-3 p-3 m-auto" :class="{ 'target': targetFrame == '1x3' }">
                            <img class="frame-vertical" src="@/assets/frame/1_3.png" @click="selectFrame('1x3')" draggable="false">
                        </div>
                        <div class="col-md-6 mb-3 p-3 m-auto" :class="{ 'target': targetFrame == '3x1' }">
                            <img class="frame-horizontal" src="@/assets/frame/3_1.png" @click="selectFrame('3x1')" draggable="false">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="mb-3 pl-3"><strong>4 Cuts</strong></div>
                <div class="mb-5 text-center">
                    <div class="row m-0">
                        <div class="col-md-6 mb-5 p-3 m-auto" :class="{ 'target': targetFrame == '1x4' }">
                            <img class="frame-vertical" src="@/assets/frame/1_4.png" @click="selectFrame('1x4')" draggable="false">
                        </div>
                        <div class="col-md-6 mb-5 p-3 m-auto" :class="{ 'target': targetFrame == '2x2' }">
                            <img class="frame-horizontal" src="@/assets/frame/2_2.png" @click="selectFrame('2x2')" draggable="false">
                        </div>
                        <div class="col-md-6 p-3 m-auto" :class="{ 'target': targetFrame == '4x1' }">
                            <img class="frame-horizontal" src="@/assets/frame/4_1.png" @click="selectFrame('4x1')" draggable="false">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="mb-3 pl-3"><strong>6 Cuts</strong></div>
                <div class="mb-5 text-center">
                    <div class="row m-0">
                        <div class="col-mb-6 mb-3 p-3 m-auto" :class="{ 'target': targetFrame == '2x3' }">
                            <img class="frame-vertical" src="@/assets/frame/2_3.png" @click="selectFrame('2x3')" draggable="false">
                        </div>
                        <div class="col-mb-6 mb-3 p-3 m-auto" :class="{ 'target': targetFrame == '3x2' }">
                            <img class="frame-horizontal" src="@/assets/frame/3_2.png" @click="selectFrame('3x2')" draggable="false">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StepOne',
    data() {
        return {
            targetFrame: null,
        }
    },
    mounted() {
        this.init();
        this.targetFrame = this.$store.getters.getFrame;
        if (!this.targetFrame) this.$store.commit('setNext', false);
        else this.$store.commit('setNext', true);
    },
    beforeDestroy() {
        this.nextStep();
    },
    methods: {
        selectFrame(id) {
            if (this.targetFrame == id) {
                this.targetFrame = null;
                this.$store.commit('setNext', false);
                this.$store.commit('setTable', {
                    'rows': 2,
                    'columns': 1,
                })
            } else {
                this.targetFrame = id;
                this.$store.commit('setNext', true);
                this.$store.commit('setTable', {
                    'columns': parseInt(id.split('x')[0]),
                    'rows': parseInt(id.split('x')[1]),
                })
            }
        },
        nextStep() {
            if (!this.targetFrame) return;

            this.$store.commit('setFrame', this.targetFrame);
        },
        init() {
            this.$store.commit('resetState');
        },
    }
}
</script>

<style scoped>
.frame-horizontal {
    margin: auto;
    box-shadow: 0.5px 0.5px 1.5px black;
    width: 300px;
}

.frame-vertical {
    box-shadow: 0.5px 0.5px 1.5px black;
    height: 300px;
}

.target {
    background-color: grey;
}

.badge {
    background-color: grey;
    color: #FFF;
    border-radius: 0.5rem;
}

.step-one {
    padding-bottom: 50px;
}
</style>