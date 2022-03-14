<template>
    <div class="preview-frame">
        <div :class="`outter-frame outter-frame-${columns}-${rows}`" ref='frame'>
            <div :class="`row p-0 m-0`" v-for="(row, rowIdx) of rowCnt" :key="rowIdx">
                <div :class="`pl-0 pr-0 inner-frame inner-frame-${columns}-${rows}`" v-for="(col, colIdx) of colCnt" :key="colIdx">
                    <div :class="`inner-frame-${columns}-${rows}`">
                        <div v-if="!images[rowIdx*colCnt.length + col]" :class="`inner-frame-${columns}-${rows}`">
                            <canvas :id="`canvas-${rowIdx*colCnt.length + col}`"></canvas>
                        </div>
                        <div v-else :class="`inner-frame-${columns}-${rows}`">
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
    name: 'previewFrame',
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
            previewImg: null,
            rowCnt: [],
            colCnt: [],
            images: {},
        }
    },
    created() {
    },
    mounted() {
        if (this.$store.getters.getPreviewImg) {
            this.previewImg = this.$store.getters.getPreviewImg;
            this.$refs.frame.style.backgroundImage = `url(${this.previewImg})`
        }

        this.images = this.$store.getters.getTargets;
        for (let i=1;i<=this.$props.rows;i++) this.rowCnt.push(i);
        for (let i=1;i<=this.$props.columns;i++) this.colCnt.push(i);
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

.outter-frame {
    padding: 20px;
    padding-right: 0px;
    padding-bottom: 0px;
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

.booth {
    position: relative;
}
</style>