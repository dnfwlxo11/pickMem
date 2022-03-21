<template>
    <div class="basic-frame">
        <div :class="`outter-frame outter-frame-${columns}-${rows}`">
            <div :class="`row p-0 m-0`" v-for="(row, rowIdx) of rowCnt" :key="rowIdx">
                <div :class="`pl-0 pr-0 inner-frame inner-frame-${columns}-${rows}`" v-for="(col, colIdx) of colCnt" :key="colIdx">
                    <div v-if="!images[rowIdx*colCnt.length + col]" :class="`inner-frame-${columns}-${rows}`">
                        <div class="h-100 w-100 d-flex justify-content-center align-items-center">
                            <div class="order-badge d-flex justify-content-center align-items-center">
                                {{(orderArray.indexOf(rowIdx*colCnt.length + col) + 1)}}
                            </div>
                        </div>
                        <!-- <canvas :id="`canvas-${rowIdx*colCnt.length + col}`"></canvas> -->
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
            default: 2,
            type: Number,
        },
        columns: {
            default: 1,
            type: Number,
        },
    },
    data() {
        return {
            rowCnt: [],
            colCnt: [],
            images: {},
            orderArray: null,
        }
    },
    created() {
    },
    mounted() {
        this.images = this.$store.getters.getTargets;
        this.rowCnt = Array.from({length: this.$props.rows}, (v, i) => i + 1);
        this.colCnt = Array.from({length: this.$props.columns}, (v, i) => i + 1);
        this.orderArray = this.$store.getters.getRemoveQueues;
    },
    methods: {
        removeImg(target) {
            this.images[target] = null;
            this.$delete(this.images, target);
            this.$store.commit('setTargets', this.images);
            this.$store.commit('setTmpTargets', this.images);
            this.$store.commit('setRemoveQueue', target);
            this.images = this.$store.getters.getTargets;

            if (Object.keys(this.$store.getters.getTargets).length != this.rows * this.columns) this.$store.commit('setNext', false);
        },
    },
}
</script>

<style lang="scss" scoped>
img {
    object-position: center center;
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.order-badge {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: lightslategrey;
    color: #FFF;
    font-size: 30px;
    box-shadow: 0.5px 0.5px 1.5px black;
}

.outter-frame {
    padding: 20px;
    padding-right: 0px;
    padding-bottom: 0px;
    box-shadow: 0.5px 0.5px 1.5px black;
    background-color: #FFF;

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
    &-2-1 {
        height: 320px;
        width: 520px;
    }
    &-2-2 {
        height: 520px;
        width: 620px;
    }
    &-2-3 {
        height: 525px;
        width: 420px;
    }
    &-3-1 {
        height: 220px;
        width: 525px;
    }
    &-3-2 {
        height: 420px;
        width: 525px;
    }
    &-4-1 {
        height: 180px;
        width: 560px;
    }
}

.inner-frame {
    position: relative;
    margin-bottom: 20px;
    margin-right: 20px;
    background: #FFF;
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
    &-2-1 {
        height: 280px;
        width: 210px;
    }
    &-2-2 {
        height: 210px;
        width: 280px;
    }
    &-2-3 {
        height: 135px;
        width: 180px;
    }
    &-3-1 {
        height: 180px;
        width: 135px;
    }
    &-3-2 {
        height: 180px;
        width: 135px;
    }
    &-4-1 {
        height: 140px;
        width: 105px;
    }
}

.overlay {
    position: absolute;
    font-size: 30px;
    top: 0%;
    left: 0%;
}
</style>