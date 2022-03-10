<template>
    <div class="step-three">
        <div style="font-size: 20px;">
            <strong>Step 3. 사진 고르기</strong>
            <hr>
        </div>
        <div class="row mb-3">
            <div class="col-8 frame d-flex">
                <test-frame class="m-auto"></test-frame>
                <!-- <default-frame></default-frame> -->
                <!-- <onethree-frame></onethree-frame> -->
                <!-- <onefour-frame></onefour-frame> -->
                <!-- <default-frame v-if="frame=='1x2'"></default-frame>
                <onethree-frame v-else-if="frame=='1x3'"></onethree-frame>
                <onefour-frame v-else-if="frame=='1x4'"></onefour-frame>
                <twoone-frame v-else-if="frame=='2x1'"></twoone-frame>
                <twotwo-frame v-else-if="frame=='2x2'"></twotwo-frame>
                <twothree-frame v-else-if="frame=='2x3'"></twothree-frame>
                <threeone-frame v-else-if="frame=='3x1'"></threeone-frame>
                <threetwo-frame v-else-if="frame=='3x2'"></threetwo-frame>
                <fourone-frame v-else-if="frame=='4x1'"></fourone-frame> -->
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
import defaultFrame from './frames/defaultFrame.vue'
import onethreeFrame from './frames/onethreeFrame.vue'
import onefourFrame from './frames/onefourFrame.vue'
import twooneFrame from './frames/twooneFrame.vue'
import twotwoFrame from './frames/twotwoFrame.vue'
import twothreeFrame from './frames/twothreeFrame.vue'
import threeoneFrame from './frames/threeoneFrame.vue'
import threetwoFrame from './frames/threetwoFrame.vue'
import fouroneFrame from './frames/fouroneFrame.vue'

import testFrame from './frames/testFrame.vue'

export default {
    name: 'StepThree',
    components: {
        defaultFrame,
        onethreeFrame,
        onefourFrame,
        twooneFrame,
        twotwoFrame,
        twothreeFrame,
        threeoneFrame,
        threetwoFrame,
        fouroneFrame,
        testFrame,
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
        this.selectTarget = this.$store.getters.getTargets;
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