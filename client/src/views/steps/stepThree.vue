<template>
    <div class="step-three">
        <div class="row p-0 m-0 mb-5">
            <basic-frame v-if="frame" class="m-auto" :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></basic-frame>
        </div>
        <div class="row p-0 m-0 mb-5">
            이미지 리스트
            <hr>
            <div class="images w-100">
                <img v-for="(value, id) in images" :key="id" :class="`mr-3 ${rows <= columns ? 'previewImg-horizontal' : 'previewImg-vertical'}`" :src="value" alt="" :id="`${id}`" @click="selectToClick(value)" draggable="false">
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
            rows: 2,
            columns: 1,
            width: 500,
            images: {},
            selectTarget: {},
            frame: null,
        }
    },

    created() {
        
    },

    mounted() {
        let table = this.$store.getters.getFrame

        this.rows = table.split('x')[0];
        this.columns = table.split('x')[1];

        if (Object.keys(this.$store.getters.getTargets).length == this.rows * this.columns) this.$store.commit('setNext', true);
        else this.$store.commit('setNext', false);

        this.images = this.$store.getters.getImages;
        this.frame = this.$store.getters.getFrame;
    },

    destroyed() {
        
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

            console.log(Object.keys(this.$store.getters.getTargets).length, this.rows * this.columns)
            if (Object.keys(this.$store.getters.getTargets).length == this.rows * this.columns) this.$store.commit('setNext', true);
            else this.$store.commit('setNext', false);
        },
    },
}
</script>

<style lang="scss" scoped>
.previewImg-horizontal {
    height: 150px;
    width: 200px;
}

.previewImg-vertical {
    height: 200px;
    width: 150px;
}

.images {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}
</style>