<template>
    <div class="step-three">
        <div class="row p-0 m-0 h-100 align-items-center">
            <div class="col-md-8">
                <div class="d-flex justify-content-center mb-3">
                    <basic-frame v-if="frame" :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></basic-frame>
                </div>
                <div class="d-flex justify-content-center">
                    <strong class="text-danger">우측의 이미지를 클릭해서 골라주세요.</strong>
                </div>
            </div>
            <div class="col-md-4">
                <div class="m-auto">
                    <div>이미지 리스트</div>
                    <hr>
                    <div class="images text-center">
                        <div class="mb-3" v-for="(id, idx) of Object.keys(images)" :key="id">
                            <i v-if="Object.values(getSelectList).includes(id)" class="mdi mdi-check-circle mr-2" style="font-size: 30px;"></i>
                            <img :class="`m-auto mr-3 ${Object.values(getSelectList).includes(id) ? 'selected' : ''} ${rows <= columns ? 'previewImg-horizontal' : 'previewImg-vertical'}`" :src="images[id]" alt="" :id="`${id}`" @click="selectToClick(getSelectTargetLen, id, images[id])" draggable="false">
                            <hr>
                        </div>
                    </div>
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
            rows: 2,
            columns: 1,
            width: 500,
            images: {},
            selectTarget: {},
            selectList: {},
            frame: null,
            queue: [],
        }
    },

    created() {   
    },

    mounted() {
        let table = this.$store.getters.getFrame

        this.rows = table.split('x')[0];
        this.columns = table.split('x')[1];

        this.selectTarget = this.$store.getters.getTargets;
        this.selectList = this.$store.getters.getTargetList;
        this.images = this.$store.getters.getImages;
        this.frame = this.$store.getters.getFrame;

        this.queue = Array.from({length: this.rows * this.columns}, (v, i) => { if (!this.selectTarget[i + 1]) return i + 1 });
        this.queue = this.queue.filter(item => item);
        this.$store.commit('setUpdateQueue', this.queue);

        if (Object.keys(this.$store.getters.getTargets).length == this.rows * this.columns) this.$store.commit('setNext', true);
        else this.$store.commit('setNext', false);
        
    },

    destroyed() {
        
    },

    methods: {
        selectToClick(idx, id, src) {
            if (Object.values(this.getSelectList).includes(id)) return;

            this.selectTarget = this.$store.getters.getTargets;
            let table = this.frame.split('x');

            if (Object.keys(this.selectTarget).length == (parseInt(table[0]) * parseInt(table[1]))) {
                this.$Utils.toast('이미 모두 골랐어요.')
                return;
            } else {
                this.queue = this.$store.getters.getRemoveQueues;
                this.$set(this.selectList, idx + 1, id);

                let recoverKey = this.queue.shift();

                this.$store.commit('setUpdateQueue', this.queue);
                this.$store.commit('setTarget', [recoverKey, src]);
                this.$store.commit('setTmpTarget', [recoverKey, src]);
                this.$store.commit('setTargetList', this.selectList);

                this.selectTarget = this.$store.getters.getTargets;
            }

            if (Object.keys(this.$store.getters.getTargets).length == this.rows * this.columns) this.$store.commit('setNext', true);
            else this.$store.commit('setNext', false);
        },
    },
    computed: {
        getSelectList() {
            return this.selectList;
        },
        getSelectTargetLen() {
            return Object.keys(this.selectTarget).length;
        },
    },
}
</script>

<style lang="scss" scoped>
.list-horizontal {
    width: 200px;
}

.list-vertical {
    width: 150px;
}

.previewImg-horizontal {
    height: 150px;
    width: 200px;
}

.previewImg-vertical {
    height: 200px;
    width: 150px;
}

.images {
    max-height: 600px;
    overflow-y: scroll;
    overflow-x: hidden;
    white-space: nowrap;
}

.selected {
    background-color: grey;
    opacity: 0.7;
}
</style>