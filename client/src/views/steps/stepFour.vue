<template>
    <div class="step-four">
        <div style="font-size: 20px;">
            <strong>Step 4. 프레임 꾸미기</strong>
            <hr>
        </div>
        <dir class="row">
            <div class="col-8">
                <div class="d-flex justify-content-center align-items-center">
                    <canvas v-if="frame" :class="`outter-frame outter-frame-${parseInt(frame.split('x')[0])}-${parseInt(frame.split('x')[1])}`" ref="canvas"></canvas>
                </div>
            </div>
            <div class="col-4">
                <div class="mb-3"><button class="btn btn-outline-primary" @click="isOpen=true">미리보기</button></div>
                배경 | 스티커 
                <hr>
                <div style="height: 450px;overflow-y: auto;">
                    <button class="btn btn-outline-primary" @click="createObj('text')">텍스트</button>
                    폰트 크기: <input class="text-right" type="number" v-model="fontSize">
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
import { fabric } from 'fabric'
import previewModal from './vues/previewModal.vue'
import previewFrame from './frames/previewFrame.vue'

export default {
    name: 'stepFour',
    components: {
        previewModal,
        previewFrame,
    },
    data() {
        return {
            frame: null,
            isOpen: false,
            canvasHeight: null,
            canvasWidth: null,
            canvas: null,
            fontSize: 15,
        }
    },
    created() {
        this.frame = this.$store.getters.getFrame;
    },
    mounted() {
        this.canvasHeight = this.$refs.canvas.clientHeight;
        this.canvasWidth = this.$refs.canvas.clientWidth;
        this.canvas = new fabric.Canvas(this.$refs.canvas);
        this.canvas.setHeight(this.canvasHeight);
        this.canvas.setWidth(this.canvasWidth);
    },
    methods: {
        createObj(type) {
            if (type == 'text') {
                let textBox = new fabric.Textbox('소중한 순간, 영원히', {
                    left: 10,
                    top: 10,
                    width: this.fontSize * 10,
                    fontSize: this.fontSize,
                });

                this.canvas.add(textBox);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.frame {
    height: 620px;
}

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
</style>