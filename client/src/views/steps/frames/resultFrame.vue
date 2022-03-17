<template>
    <div :class="`result-frame outter-frame-${columns}-${rows}`">
        <div :class="`outter-frame outter-frame-${columns}-${rows}`" ref='frame' style="">
            <div :class="`row p-0 m-0`" v-for="(row, rowIdx) of rowCnt" :key="rowIdx">
                <div :class="`pl-0 pr-0 inner-frame inner-frame-${columns}-${rows}`" v-for="(col, colIdx) of colCnt" :key="colIdx">
                    <div :class="`inner-frame-${columns}-${rows}`">
                        <div :class="`inner-frame-${columns}-${rows}`">
                            <img :src="images[rowIdx*colCnt.length + col]" :id="`canvas-${rowIdx*colCnt.length + col}`" draggable="false">
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'resultFrame',
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
            frameImg: null,
            canvas: null,
            rowCnt: [],
            colCnt: [],
            images: {},
        }
    },
    created() {
    },
    mounted() {
        if (this.$store.getters.getFrameImg) {
            this.frameImg = this.$store.getters.getFrameImg;
            this.$refs.frame.style.backgroundImage = `url(${this.frameImg})`
        }

        this.images = this.$store.getters.getTargets;
        for (let i=1;i<=this.$props.rows;i++) this.rowCnt.push(i);
        for (let i=1;i<=this.$props.columns;i++) this.colCnt.push(i);
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
img {
    object-position: center center;
    object-fit: cover;
    height: 100%;
    width: 100%;
    background: #FFF;

    // box-shadow: 0.5px 0.5px 1.5px black;

    border-style: solid;
    border-width: 0.5px 1px 1px 0.5px;
    border-color: grey;
}

.outter-frame {
    padding: 18px;
    padding-right: 0px;
    padding-bottom: 0px;

    // box-shadow: 0.5px 0.5px 1.5px black;

    border-style: solid;
    border-width: 0.5px 1px 1px 0.5px;
    border-color: grey;

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
    margin-bottom: 20px;
    margin-right: 20px;
    background-color: #FFF;

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
</style>