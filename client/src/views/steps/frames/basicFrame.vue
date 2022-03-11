<template>
    <div class="basic-frame">
        <div :class="`outter-frame outter-frame-${columns}-${rows}`">
            <div :class="`row p-0 m-0`" v-for="(row, rowIdx) of rowCnt" :key="rowIdx"
                @drop="drop" @dragover.prevent>
                <div :class="`pl-0 pr-0 inner-frame inner-frame-${columns}-${rows}`" v-for="(col, colIdx) of colCnt" :key="colIdx">
                    <div v-if="!images[rowIdx*colCnt.length + col]" :class="`inner-frame-${columns}-${rows}`">
                        <canvas :id="`canvas-${rowIdx*colCnt.length + col}`"></canvas>
                    </div>
                    <div v-else :class="`inner-frame-${columns}-${rows}`">
                        <img :src="images[rowIdx*colCnt.length + col]" :id="`canvas-${rowIdx*colCnt.length + col}`" draggable="false">
                        <div class="overlay" @click="removeImg(rowIdx*colCnt.length + col)"><i class="mdi mdi-close"></i></div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'basicFrame',
    props: {
        rows: {
            default: 1,
            type: Number,
        },
        columns: {
            default: 4,
            type: Number,
        },
    },
    data() {
        return {
            rowCnt: [],
            colCnt: [],
            images: {},
        }
    },
    created() {
    },
    mounted() {
        this.images = this.$store.getters.getTargets;
        for (let i=1;i<=this.$props.rows;i++) this.rowCnt.push(i);
        for (let i=1;i<=this.$props.columns;i++) this.colCnt.push(i);
    },
    methods: {
        drop(e) {
            this.$store.commit('setTarget', [e.target.id.split('-')[1], e.dataTransfer.getData('text/plain')]);
            this.images = this.$store.getters.getTargets;

            let removeQueue = this.$store.getters.getRemoveQueues;
            removeQueue.shift();
            this.$store.commit('setUpdateQueue', removeQueue)
        },

        removeImg(target) {
            this.images[target] = null;
            delete this.images[target]
            this.$store.commit('setTargets', this.images);
            this.$store.commit('setRemoveQueue', target);
            this.images = this.$store.getters.getTargets;
        },
    }
}
</script>

