<template>
    <div class="step-three">
        <div style="font-size: 20px;">
            <strong>Step 3. 사진 고르기</strong>
            <hr>
        </div>
        <div class="row mb-3">
            <div class="col-8 frame d-flex">
                <basic-frame v-if="frame" class="m-auto" :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></basic-frame>
            </div>
            <div class="col-4">
                이미지 리스트
                <hr>
                <div style="height: 550px;overflow-y: auto;">
                    <div v-for="(value, id) in images" :key="id" @dragstart="dragStart" @dragleave.prevent @drop.prevent>
                        <img class="previewImg" :src="value" alt="" :id="`${id}`" @click="selectToClick(value)">
                        <hr>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-outline-primary mr-3" @click="$emit('on-previous')">이 전 단 계</button>
            <button class="btn btn-outline-primary" @click="$emit('on-next')">다 음 단 계</button>
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
            images: {},
            selectTarget: {},
            frame: null,
        }
    },
    mounted() {
        this.images = this.$store.getters.getImages;
        this.frame = this.$store.getters.getFrame;
    },
    methods: {
        selectToClick(src) {
            this.selectTarget = this.$store.getters.getTargets;
            let table = this.frame.split('x');

            if (Object.keys(this.selectTarget).length > (parseInt(table[0]) * parseInt(table[1])) - 1) {
                console.log('이미 모두 골랐어요.')
                return;
            } else {
                if (this.$store.getters.getRemoveQueueCnt) {
                    let removeQueue = this.$store.getters.getRemoveQueues;
                    let recoverKey = removeQueue.shift();

                    this.$store.commit('setUpdateQueue', removeQueue);
                    this.$store.commit('setTarget', [recoverKey, src]);
                    this.$store.commit('setTmpTarget', [recoverKey, src]);
                }
                else {
                    this.$store.commit('setTarget', [Object.keys(this.selectTarget).length + 1, src]);
                    this.$store.commit('setTmpTarget', [Object.keys(this.selectTarget).length + 1, src]);
                }
                this.selectTarget = this.$store.getters.getTargets;
            }
        },
        dragStart(e) {
            e.dataTransfer.setData("text/plain", e.target.src);
        },
    },
}
</script>

<style lang="scss" scoped>
.frame {
    height: 620px;
}

.previewImg {
    height: 140px;
    width: 200px;
}
</style>