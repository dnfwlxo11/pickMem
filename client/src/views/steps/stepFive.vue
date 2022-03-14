<template>
    <div class="step-five">
        <div style="font-size: 20px;">
            <div class="row m-0 p-0 w-100">
                <div class="col-6 p-0 m-0 text-left"><strong>Step 5. 사진 꾸미기</strong></div>
                <div class="col-6 p-0 m-0 text-right">
                    <button class="btn btn-outline-primary mr-2" @click="saveWork">저장</button>
                    <button class="btn btn-outline-primary" @click="isOpen=true">미리보기</button>
                </div>
            </div>
            <hr>
        </div>
        <dir class="frame">
            <div class="row m-0 p-0">
                <div class="col-8">
                    <canvas :class="`decoImg ${targetFilter}`" ref="canvas" width="600" height="450"></canvas>
                    <div class="text-center">
                        <span @click="prevImg"><i class="mdi mdi-arrow-left-bold" style="font-size: 50px;"></i></span>
                        <span style="font-size: 25px;">{{currImg}} / {{Object.keys(images).length}}</span>
                        <span @click="nextImg"><i class="mdi mdi-arrow-right-bold" style="font-size: 50px;"></i></span>
                    </div>
                </div>
                <div class="col-4">
                    <span @click="isMode='filter'">필터</span> | <span @click="isMode='sticker'">스티커</span> | <span @click="isMode='draw'">그리기</span>
                    <hr>
                    <div v-if="isMode=='filter'">
                        <div v-if="images[currImg]" class="row" style="height: 450px;overflow-y: auto;">
                            <div :class="{ 'target': targetFilter == filter }" class="col-5 text-center mr-auto ml-auto mb-3 card" v-for="(filter, idx) of filters" :key="idx" @click="selectFilter(filter)">
                                <img :class="`filterImg ${filter} mb-2`" :src="images[currImg]">
                                <div>{{filter}}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="isMode=='sticker'" style="height: 450px;overflow-y: auto;">
                        <div v-for="(value, theme) in sticker" :key="theme">
                            <div class="mb-3"><strong>{{theme}} 테마</strong></div>
                            <div class="row m-0 p-0 mb-5">
                                <div :id="`${theme}_${item}`" :class="{ 'target': targetSticker == `${theme}_${item}` }" class="col-3 mb-3 text-center" v-for="(item, idx) of value" :key="idx" @click="isSticker=!isSticker;selectSticker(`${theme}_${item}`)">
                                    <img :ref="`${theme}_${item}`" class="sticker" :src="`/stickers/${theme}_${item}.png`">
                                </div>
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
        <img ref="hiddenImg">
        <preview-modal v-if="isOpen" @on-close="isOpen=false" :columns="parseInt(frame.split('x')[0])" :rows="parseInt(frame.split('x')[1])"></preview-modal>
    </div>
</template>

<script>
import { fabric } from 'fabric'
import previewModal from './vues/previewModal.vue'
import previewFrame from './frames/previewFrame.vue'

export default {
    name: 'stepFive',
    components: {
        previewModal,
        previewFrame,
    },
    data() {
        return {
            currImg: 1,
            frame: null,
            rows: 2,
            columns: 1,
            images: {},
            isMode: 'special',
            isOpen: false,
            isSticker: false,
            targetFilter: null,
            targetSticker: null,
            sticker: {
                'cute_handdrawn': [],
                'cute_natural_doodle': [],
                'flower_leaf': [],
            },
            filters: [
                'blur',
                'brightness',
                'contrast',
                'grayscale',
                'huerotate',
                'invert',
                'saturate',
                'sepia',
            ]
        }
    },
    created() {
        this.frame = this.$store.getters.getFrame;
    },
    mounted() {
        this.init();
        window.addEventListener('keydown', this.setKeydownEvent);
    },
    destroyed() {
        window.removeEventListener('keydown', this.setKeydownEvent);
    },
    methods: {
        async init() {
            this.images = this.$store.getters.getTargets;
            this.sticker.cute_handdrawn = Array.from({length: 6}, (v, i) => i + 1);
            this.sticker.cute_natural_doodle = Array.from({length: 12}, (v, i) => i + 1);
            this.sticker.flower_leaf = Array.from({length: 38}, (v, i) => i + 1);
            this.canvas = new fabric.Canvas(this.$refs.canvas);
            
            if (this.$store.getters.getCanvas) {
                this.canvas.loadFromJSON(this.$store.getters.getCanvas, this.canvas.renderAll.bind(this.canvas))        
            }

            const bgImg = await this.loadImgFromBase64(this.images[this.currImg]);
            this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                scaleX: this.canvas.width / bgImg.width,
                scaleY: this.canvas.height / bgImg.height
            })

            this.setMouseEvent();
        },
        saveWork() {
            // this.$store.commit('setCanvas', JSON.stringify(this.canvas.toObject(['id'])));
            // this.$store.commit('setPreviewImg', this.canvas.toDataURL({ format: 'image/png' }));
        },
        setMouseEvent() {
            this.canvas.on('mouse:down', (e) => {
                if (this.isSticker) {
                    this.createObj('sticker', e.pointer.x, e.pointer.y);
                } else if (e.target) {
                    e.target.opacity = 0.5;
                    this.canvas.renderAll();
                }
            }).on('mouse:up', (e) => {
                if (e.target) {
                    e.target.opacity = 1;
                    this.canvas.renderAll();
                }
            }).on('selection:created', (e) => {
                if (e.selected.length > 1) this.canvas.discardActiveObject().renderAll();
            })
        },
        setKeydownEvent(e) {
            const allowKeys = [' ', 'DELETE']
            let pressKey = e.key.toUpperCase();

            if (!allowKeys.includes(pressKey)) return false
                
            if (pressKey == 'DELETE') {
                let targetObj = this.canvas.getActiveObject();

                this.canvas.remove(targetObj);
                this.canvas.renderAll();
            }
        },
        async prevImg() {
            if (this.currImg == 1) return;

            this.currImg -= 1;

            const bgImg = await this.loadImgFromBase64(this.images[this.currImg]);
            this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                scaleX: this.canvas.width / bgImg.width,
                scaleY: this.canvas.height / bgImg.height
            })
        },
        async nextImg() {
            if (this.currImg == Object.keys(this.images).length) return;

            this.currImg += 1;

            const bgImg = await this.loadImgFromBase64(this.images[this.currImg]);
            this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                scaleX: this.canvas.width / bgImg.width,
                scaleY: this.canvas.height / bgImg.height
            })
        },
        loadImgFromBase64(base64) {
            return new Promise((resolve, reject) => {
                fabric.Image.fromURL(base64, (image) => {
                    resolve(image);
                })
            });
        },
        createObj(type, left, top) {
            if (type == 'sticker') {
                let image = new fabric.Image(this.$refs[this.targetSticker][0], {
                    left: left,
                    top: top
                });
                
                this.canvas.add(image);
                this.canvas.renderAll();

                this.isSticker = false;
            }
        },
        selectSticker(id) {
            if (this.targetSticker == id) this.targetSticker = null;
            else this.targetSticker = id;
        },
        selectFilter(target) {
            if (this.targetFilter == target) this.targetFilter = null;
            else this.targetFilter = target;
        }
    },
}
</script>

<style lang="scss" scoped>
.frame {
    height: 620px;
}

.decoImg {
    box-shadow: 0.5px 0.5px 1.5px black;
    background-color: #FFF;
}

.filterImg {
    height: 75px;
    width: 100px;
}

.target {
    background-color: grey;
}

.sticker {
    object-fit: contain;
    height: 40px;
    width: 40px;
}

.blur { filter: blur(1px); }
.brightness { filter: brightness(0.50); }
.contrast { filter: contrast(180%); }
.grayscale { filter: grayscale(100%); }
.huerotate { filter: hue-rotate(180deg); }
.invert { filter: invert(100%); }
.opacity { filter: opacity(50%); }
.saturate { filter: saturate(7); }
.sepia { filter: sepia(100%); }
</style>