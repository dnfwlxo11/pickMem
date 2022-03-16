<template>
    <div class="step-three">
        <div class="row mb-3">
            <basic-frame v-if="frame" class="m-auto" :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></basic-frame>
        </div>
        <div class="row">
            이미지 리스트
            <hr>
            <div style="verticalScroll" ref="vertical">
                <div class="images mr-3" v-for="(value, id) in images" :key="id">
                    <img class="previewImg" :src="value" alt="" :id="`${id}`" @click="selectToClick(value)" draggable="false">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import basicFrame from './frames/basicFrame.vue'

export default {
    name: 'StepThree',
    components: {
        basicFrame,
    },
    data() {
        return {
            width: 500,
            images: {},
            selectTarget: {},
            frame: null,
        }
    },
    mounted() {
        this.$refs.vertical.style.width = this.width;
        this.images = this.$store.getters.getImages;
        this.frame = this.$store.getters.getFrame;
    },
    methods: {
        selectToClick(src) {
            this.selectTarget = this.$store.getters.getTargets;
            let table = this.frame.split('x');

            if (Object.keys(this.selectTarget).length == (parseInt(table[0]) * parseInt(table[1]))) {
                console.log('이미 모두 골랐어요.')
                return;
            } else {
                let targetLen = Object.keys(this.selectTarget).length;

                if (this.$store.getters.getRemoveQueueCnt) {
                    let removeQueue = this.$store.getters.getRemoveQueues;
                    let recoverKey = removeQueue.shift();

                    this.$store.commit('setUpdateQueue', removeQueue);
                    this.$store.commit('setTarget', [recoverKey, src]);
                    this.$store.commit('setTmpTarget', [recoverKey, src]);
                }
                else {
                    this.$store.commit('setTarget', [targetLen + 1, src]);
                    this.$store.commit('setTmpTarget', [targetLen + 1, src]);
                }

                this.selectTarget = this.$store.getters.getTargets;
            }
        },
        // dragStart(e) {
        //     e.dataTransfer.setData("text/plain", e.target.src);
        // },
    },
}
</script>

<style lang="scss" scoped>
.previewImg {
    height: 140px;
    width: 200px;
}

.verticalScroll {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
}

.images {
    float: left;
}
</style>