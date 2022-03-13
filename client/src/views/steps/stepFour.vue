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
                <div class="mb-3"><button class="btn btn-outline-primary" @click="saveWork">임시 저장</button></div>
                <div class="mb-3"><button class="btn btn-outline-primary" @click="isOpen=true">미리보기</button></div>
                배경색 | 스티커 | 커스텀
                <hr>
                <div class="mb-3">
                <!-- <div style="height: 450px;overflow-y: auto;"> -->
                    <button :class="{'btn-primary': isText, 'btn-outline-primary': !isText}" class="btn mr-3" @click="isText=!isText">텍스트</button>
                    <input type="number" v-model="fontSize">
                </div>
                <div style="height: 300px;overflow-y: auto;">
                    스티커
                    <hr>
                    <div v-for="(value, theme) in sticker" :key="theme">
                        <div class="mb-3"><strong>{{theme}} 테마</strong></div>
                        <div class="row m-0 p-0 mb-5">
                            <div class="col-3 mb-3" v-for="(item, idx) of value" :key="idx" @click="selectSticker(theme, item)">
                                <img :id="`${theme}_${item}`" class="sticker" :src="`/stickers/${theme}_${item}.png`">
                            </div>
                        </div>
                    </div>
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
            isText: false,
            canvasHeight: null,
            canvasWidth: null,
            canvas: null,
            fontSize: 16,
            sticker: {
                'cute_handdrawn': [],
                'cute_natural_doodle': [],
                'flower_leaf': [],
            }
        }
    },
    created() {
        this.frame = this.$store.getters.getFrame;
    },
    mounted() {
        this.sticker.cute_handdrawn = Array.from({length: 6}, (v, i) => i + 1);
        this.sticker.cute_natural_doodle = Array.from({length: 12}, (v, i) => i + 1);
        this.sticker.flower_leaf = Array.from({length: 38}, (v, i) => i + 1);

        this.canvasHeight = this.$refs.canvas.clientHeight;
        this.canvasWidth = this.$refs.canvas.clientWidth;
        this.canvas = new fabric.Canvas(this.$refs.canvas);
        this.canvas.setHeight(this.canvasHeight);
        this.canvas.setWidth(this.canvasWidth);

        if (this.$store.getters.getCanvas) {
            this.canvas.loadFromJSON(this.$store.getters.getCanvas, this.canvas.renderAll.bind(this.canvas))        
            this.setCanvasOption();
        }

        this.setEvent();
    },
    methods: {
        setEvent() {
            this.canvas.on('mouse:down', (e) => {
                console.log(e)
                if (this.isText) {
                    this.createObj('text', e.pointer.x, e.pointer.y)
                } else if (e.target) {
                    e.target.opacity = 0.5;
                    this.canvas.renderAll();
                }
            }).on('mouse:up', (e) => {
                if (e.target) {
                    e.target.opacity = 1;
                    this.canvas.renderAll();
                }
            });
        },
        createObj(type, left, top) {
            if (type == 'text') {
                let textBox = new fabric.Textbox('내용을 입력하세요.', {
                    left: left,
                    top: top,
                    width: 150,
                    fontSize: this.fontSize,
                    textAlign: 'left',
                    id: `textBox_${(new Date).getDate()}`
                });

                this.canvas.add(textBox);
                this.canvas.renderAll();
                
                this.setTextEvent(textBox);

                this.isText = false;
            }
        },
        saveWork() {
            this.$store.commit('setCanvas', JSON.stringify(this.canvas.toObject(['id'])));
            this.$store.commit('setPreviewImg', this.canvas.toDataURL({ format: 'image/png' }));
        },
        setTextEvent(textBox) {
            textBox.setControlsVisibility({
                mt: false, mb: false, 
                bl: false, br: false, 
                tl: false, tr: false,
            });

            textBox.on('selected', (e) => {
                this.canvas.renderAll();
            });

            textBox.on("editing:entered", (e) =>{
                let obj = this.canvas.getActiveObject();

                if (obj.text == "내용을 입력하세요."){
                    obj.selectAll();
                    obj.removeChars();
                }
            });

            textBox.on(("changed"), () => {

                let actualWidth = textBox.scaleX * textBox.width;
                let largest = this.canvas.getActiveObject().__lineWidths.filter(item => item)[0] ? this.canvas.getActiveObject().__lineWidths.filter(item => item)[0] : 1;
                let tryWidth = (largest + 15) * textBox.scaleX;

                this.canvas.getActiveObject().set("width", tryWidth);

                if ((textBox.left + actualWidth) >= this.canvas.width - 10) {
                    textBox.set("width", this.canvas.width - left - 10)
                }

                this.canvas.renderAll();
            });

            textBox.on(("modified"), () => {
                this.canvas.renderAll();
            });
        },
        setCanvasOption() {
            this.canvas.getObjects().map(item => {
                if (item.id.includes('textBox')) {
                    this.setTextEvent(item);
                }
            })
        },
        selectSticker(theme, idx) {
            console.log(theme, idx);
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

.sticker {
    object-fit: contain;
    height: 40px;
    width: 40px;
}

.outter-frame {
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
</style>