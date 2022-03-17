<template>
    <div class="step-five">
        <div class="text-center mb-3">
            <button class="btn btn-outline-primary mr-2" @click="saveWork">저장</button>
            <button class="btn btn-outline-primary" @click="isOpen=true">미리보기</button>
        </div>
        <dir class="frame">
            <div class="row m-0 p-0">
                <div class="col-8">
                    <canvas :class="`decoImg`" ref="canvas" width="600" height="450"></canvas>
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
                        <input type="range" min="0.0" max="1.0" step="0.01" v-model="filterVal">
                        <div v-if="images[currImg]" class="row" style="height: 450px;overflow-y: auto;">
                            <div :class="{ 'target': targetFilter == filter }" class="col-5 text-center mr-auto ml-auto mb-3 card" v-for="(obj, filter) in filters" :key="filter" @click="selectFilter(filter)">
                                <img class="filterImg pt-1 mb-2 m-auto">
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
            isMode: 'filter',
            isOpen: false,
            isSticker: false,
            targetFilter: 'normal',
            targetSticker: null,
            sticker: {
                'cute_handdrawn': [],
                'cute_natural_doodle': [],
                'flower_leaf': [],
            },
            filters: {
                'normal': null, 'grayscale': null, 'invert': null, 'sepia': null, 'brownie': null,
                'brightness': null, 'contrast': null, 'saturation': null, 'vibrance': null,
                'vintage': null,'pixelate': null, 'blur': null, 
            },
            filterVal: 0.5,
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

            await this.loadImgCanvas();

            this.setFilterObj();
            this.setMouseEvent();
        },

        setFilterObj() {
            this.$set(this.filters, 'normal', null);
            this.$set(this.filters, 'grayscale', new fabric.Image.filters.Grayscale({ grayscale: 0.5 }));
            this.$set(this.filters, 'invert', new fabric.Image.filters.Invert({ invert: 1 }));
            this.$set(this.filters, 'sepia', new fabric.Image.filters.Sepia({ sepia: 0.5 }));
            this.$set(this.filters, 'brownie', new fabric.Image.filters.Brownie({ brownie: 0.5 }));
            this.$set(this.filters, 'brightness', new fabric.Image.filters.Brightness({ brightness: 0.5 }));
            this.$set(this.filters, 'contrast', new fabric.Image.filters.Contrast({ contrast: 0.5 }));
            this.$set(this.filters, 'saturation', new fabric.Image.filters.Saturation({ saturation: 0.5 }));
            this.$set(this.filters, 'vibrance', new fabric.Image.filters.Vibrance({ vibrance: 0.5 }));
            this.$set(this.filters, 'vintage', new fabric.Image.filters.Vintage({ vintage: 0.5 }));
            this.$set(this.filters, 'pixelate', new fabric.Image.filters.Pixelate({ pixelate: 0.5 }));
            this.$set(this.filters, 'blur', new fabric.Image.filters.Blur({ blur: 0.1 }));
        },

        saveWork() {
            this.canvas.discardActiveObject().renderAll();

            this.$store.commit('setTarget', [this.currImg, this.canvas.toDataURL()]);
            this.$store.commit('setImgCanvas', [this.currImg, JSON.stringify(this.canvas.toObject(['id']))])
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

            await this.loadImgCanvas();            
        },

        async nextImg() {
            if (this.currImg == Object.keys(this.images).length) return;

            this.currImg += 1;

            await this.loadImgCanvas();
        },

        async loadImgCanvas() {
            if (this.$store.getters.getImgCanvas(this.currImg)) {
                let json = this.$store.getters.getImgCanvas(this.currImg)
                
                await this.loadCanvasToJSON(json);
                
                let backgroundImgObj = this.canvas.backgroundImage;

                if (backgroundImgObj.filters.length) this.targetFilter = backgroundImgObj.filters[0].type.toLowerCase();    
                else this.targetFilter = 'normal';
            } else {
                const bgImg = await this.loadImgFromBase64(this.$store.getters.getTmpTarget(this.currImg));
                this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                    scaleX: this.canvas.width / bgImg.width,
                    scaleY: this.canvas.height / bgImg.height
                });

                this.canvas.backgroundColor = '#FFFFFF';
                this.canvas.renderAll();

                this.$store.commit('setImgCanvas', [this.currImg, JSON.stringify(this.canvas.toObject(['id']))]);
            }            
        },

        loadCanvasToJSON(json) {
            return new Promise((resolve, reject) => {
                this.canvas.loadFromJSON(json, () => {
                    this.canvas.renderAll.bind(this.canvas);
                    resolve(true);    
                });
            });
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

        async selectFilter(target) {
            if (this.targetFilter == target || target == 'normal') {
                this.targetFilter = 'normal'
                const bgImg = await this.loadImgFromBase64(this.$store.getters.getTmpTarget(this.currImg));
                this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                    scaleX: this.canvas.width / bgImg.width,
                    scaleY: this.canvas.height / bgImg.height
                })
            } else {
                this.targetFilter = target
                const bgImg = await this.loadImgFromBase64(this.images[this.currImg]);
                bgImg.filters = [this.filters[this.targetFilter]];
                bgImg.applyFilters();
                this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                    scaleX: this.canvas.width / bgImg.width,
                    scaleY: this.canvas.height / bgImg.height
                })
            }

            this.$store.commit('setImgCanvas', [this.currImg, JSON.stringify(this.canvas.toObject(['id']))]);
        },

        applyFilterVal() {
            
        },

        async initImg(idx) {
            this.$set(this.images, idx, this.$store.getters.getTmpTarget(idx));

            this.canvas.getObjects().forEach(obj => {
                this.canvas.remove(obj);
            })

            const bgImg = await this.loadImgFromBase64(this.images[this.currImg]);
            this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                scaleX: this.canvas.width / bgImg.width,
                scaleY: this.canvas.height / bgImg.height
            })

            this.saveWork();
        },
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

// .blur { filter: blur(1px); }
// .brightness { filter: brightness(0.50); }
// .contrast { filter: contrast(180%); }
// .grayscale { filter: grayscale(100%); }
// .huerotate { filter: hue-rotate(180deg); }
// .invert { filter: invert(100%); }
// .opacity { filter: opacity(50%); }
// .saturate { filter: saturate(7); }
// .sepia { filter: sepia(100%); }
</style>