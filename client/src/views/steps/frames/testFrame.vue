<template>
    <div class="test-frame">
        <div :class="`outter-frame outter-frame-${columns}-${rows}`">
            <div :class="`inner-frame inner-frame-${columns}-${rows}`" v-for="(item, idx) of imageCnt" :key="idx"
                @drop="drop" @dragover.prevent>
                <div v-if="!images[item]">
                    <canvas :id="`canvas-${item}`" ></canvas>
                    <div class="overlay" @click="removeImg(item)"><i class="mdi mdi-close"></i></div>
                </div>
                <div v-else>
                    <img :src="images[item]" :id="`canvas-${item}`" alt="" draggable="false">
                    <div class="overlay" @click="removeImg(item)"><i class="mdi mdi-close"></i></div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'testFrame',
    props: {
        rows: {
            default: 1,
            type: Number,
        },
        columns: {
            default: 1,
            type: Number,
        },
    },
    data() {
        return {
            imageCnt: [],
            images: {},
        }
    },
    created() {
    },
    mounted() {
        this.images = this.$store.getters.getTargets;
        for (let i=1;i<=this.$props.rows*this.$props.columns;i++) this.imageCnt.push(i);
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
            console.log(this.$store.getters.getRemoveQueues);

        },
    }
}
</script>

<style lang="scss" scoped>
.outter-frame {
    padding: 20px;
    box-shadow: 0.5px 0.5px 1.5px black;

    &-1-1 {
        height: 350px;
        width: 400px;
    }
    &-1-2 {
        height: 520px;
        width: 320px;
    }
    &-1-3 {
        height: 525px;
        width: 220px;
    }
    &-1-4 {
        height: 560px;
        width: 180px;
    }
    
    
}

.inner-frame {
    position: relative;
    margin-bottom: 20px;
    box-shadow: 0.5px 0.5px 1.5px black;

    &-1-1 {
        height: 270px;
        width: 360px;
    }
    &-1-2 {
        height: 210px;
        width: 280px;
    }
    &-1-3 {
        height: 135px;
        width: 180px;
    }
    &-1-4 {
        height: 105px;
        width: 140px;
    }
    
}

.overlay {
    position: absolute;
    font-size: 30px;
    top: 0%;
    left: 0%;
}

.booth {
    position: relative;
}
</style>