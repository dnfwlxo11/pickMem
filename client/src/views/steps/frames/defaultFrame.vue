<template>
    <div class="default-frame">
        <div class="outter-frame mt-3 mb-3">
            <div class="inner-frame d-flex justify-content-center align-items-center mb-4" v-for="(item, idx) of [1, 2]" :key="idx">
                <div class="booth" @drop="drop" @dragover.prevent>
                    <div v-if="!images[item]" class="image">
                        <canvas class="inner-image" :id="`canvas-${item}`" ></canvas>
                    </div>
                    <div v-else>
                        <img class="inner-image" :src="images[item]" :id="`canvas-${item}`" alt="" draggable="false">
                        <div class="overlay" @click="removeImg(item)"><i class="mdi mdi-close"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: 'DefaultFrame',
    components: {
        draggable,
    },
    data() {
        return {
            images: {},
        }
    },
    created() {
    },
    mounted() {
        this.images = this.$store.getters.getTargets;
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
    },
}
</script>

<style scoped>
.outter-frame {
    padding: 20px;
    height: 500px;
    width: 300px;
    box-shadow: 0.5px 0.5px 1.5px black;
}

.inner-image {
    height: 180px;
    width: 250px;
    box-shadow: 0.5px 0.5px 1.5px black;
}

.overlay {
    position: absolute;
    font-size: 30px;
    top: -4%;
    left: 88%;
}

.booth {
    position: relative;
}
</style>