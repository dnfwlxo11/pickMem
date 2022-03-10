<template>
    <div class="step-three">
        <div style="font-size: 20px;">
            <strong>Step 3. 사진 고르기</strong>
            <hr>
        </div>
        <div class="row mb-3">
            <div class="col-8 frame d-flex justify-content-center">
                <default-frame></default-frame>
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
            <button class="btn btn-outline-primary" @click="$emit('on-previous')">이 전 단 계</button>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import defaultFrame from './frames/defaultFrame.vue'

export default {
    name: 'StepThree',
    components: {
        defaultFrame,
        draggable,
    },
    data() {
        return {
            images: {},
            selectTarget: {},
        }
    },
    mounted() {
        this.images = this.$store.getters.getImages;
        this.selectTarget = this.$store.getters.getTargets;
    },
    methods: {
        selectToClick(src) {
            this.selectTarget = this.$store.getters.getTargets;

            if (Object.keys(this.selectTarget).length > 1) {
                console.log('이미 모두 골랐어요.')
                return;
            } else {
                if (this.$store.getters.getRemoveQueueCnt) {
                    let removeQueue = this.$store.getters.getRemoveQueues;
                    console.log(removeQueue, 'before');
                    let recoverKey = removeQueue.shift();
                    console.log(removeQueue, 'after');
                    this.$store.commit('setUpdateQueue', removeQueue)
                    this.$store.commit('setTarget', [recoverKey, src])
                }
                else {
                    this.$store.commit('setTarget', [Object.keys(this.selectTarget).length + 1, src]);
                }
                this.selectTarget = this.$store.getters.getTargets;
            }
        },
        dragStart(e) {
            e.dataTransfer.setData("text/plain", e.target.src)
        },
    },
}
</script>

<style scoped>
.frame {
    height: 620px;
}

.previewImg {
    height: 140px;
    width: 200px;
}
</style>