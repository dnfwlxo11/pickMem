<template>
    <div class="step-four">
        <div style="font-size: 20px;">
            <strong>Step 4. 프레임 꾸미기</strong>
            <hr>
        </div>
        <dir class="row">
            <div class="col-8 text-center m-auto">
                <working-frame :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></working-frame>
                <!-- <preview-frame v-if="frame" class="m-auto" :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></preview-frame> -->
            </div>
            <div class="col-4">
                <div class="mb-3"><button class="btn btn-outline-primary" @click="isOpen=true">미리보기</button></div>
                배경 | 스티커 
                <hr>
                <div style="height: 450px;overflow-y: auto;">
                </div>
            </div>
        </dir>
        <div class="text-center">
            <button class="btn btn-outline-primary mr-3" @click="$emit('on-previous')">이 전 단 계</button>
            <button class="btn btn-outline-primary" @click="$emit('on-next')">다 음 단 계</button>
        </div>
        <preview-modal v-if="isOpen" @on-close="isOpen=false" :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></preview-modal>
    </div>
</template>

<script>
import previewModal from './vues/previewModal.vue'
import workingFrame from './frames/workingFrame.vue'
import previewFrame from './frames/previewFrame.vue'

export default {
    name: 'stepFour',
    components: {
        previewModal,
        workingFrame,
        previewFrame,
    },
    data() {
        return {
            frame: null,
            isOpen: false,
        }
    },
    mounted() {
        this.frame = this.$store.getters.getFrame;
    },
}
</script>

<style lang="scss" scoped>
.frame {
    height: 620px;
}
</style>