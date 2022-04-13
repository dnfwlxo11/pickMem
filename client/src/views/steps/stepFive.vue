<template>
    <div class="step-five">
        <div class="row m-0 p-0">
            <div class="col-md-8 text-center">
                <div class="row">
                    <div class="col mb-3">
                        <!-- <button class="btn-custom mr-2" @click="saveWork">저장</button> -->
                        <button class="btn-custom" @click="isOpen=true">미리보기</button>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center" @drop="drop" @dragover.prevent>
                    <canvas v-if="parseInt(frame.split('x')[0]) <= parseInt(frame.split('x')[1])" class="decoImg-horizontal" ref="canvas" width="600" height="450"></canvas>
                    <canvas v-else class="decoImg-vertical" ref="canvas" width="450" height="600"></canvas>
                </div>
                <div class="row w-100 text-center">
                    <div class="col-3"></div>
                    <div class="col-2"><span @click="prevImg"><i class="mdi mdi-chevron-left" style="font-size: 40px;"></i></span></div>
                    <div class="col-2 d-flex justify-content-center align-items-center"><span style="font-size: 25px;">{{currImg}} / {{Object.keys(images).length}}</span></div>
                    <div class="col-2"><span @click="nextImg"><i class="mdi mdi-chevron-right" style="font-size: 40px;"></i></span></div>
                    <div class="col-3"></div>
                </div>
            </div>
            <div class="col-md-4">
                <span :class="{ 'target': isMode=='filter' }" class="p-2" @click="isDraw=false;setDrawMode();canvas.isDrawingMode=false;isMode='filter'">필터</span> | 
                <span :class="{ 'target': isMode=='sticker' }" class="p-2" @click="isDraw=false;setDrawMode();canvas.isDrawingMode=false;isMode='sticker'">스티커</span> | 
                <span :class="{ 'target': isMode=='draw' }" class="p-2" @click="isDraw=true;setDrawMode();canvas.isDrawingMode=true;isMode='draw'">그리기</span>
                <hr>
                <div v-show="isMode=='filter'">
                    <div v-if="images[currImg]" class="row" style="height: 600px;overflow-y: auto;">
                        <div :class="{ 'target': targetFilter == filter }" class="col-5 text-center mr-auto ml-auto mb-3 card" v-for="(obj, filter) in filters" :key="filter" @click="selectFilter(filter)">
                            <canvas :ref="`${filter}_canvas`" :height="`${parseInt(frame.split('x')[0]) <= parseInt(frame.split('x')[1]) ? '75px' : '100px'}`" :width="`${parseInt(frame.split('x')[0]) <= parseInt(frame.split('x')[1]) ? '100px' : '75px'}`" class="pt-1 mb-2"></canvas>
                            <img :ref="`${filter}_sample`" :src="require(`@/assets/img/filter-sample.jpg`)" :class="`${parseInt(frame.split('x')[0]) <= parseInt(frame.split('x')[1]) ? 'filterImg-horizontal' : 'filterImg-vertical'}`" style="position: absolute;visibility: hidden;">
                            <div>{{filter}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="isMode=='sticker'" style="height: 600px;overflow-y: auto;">
                    <div v-for="(value, theme) in sticker" :key="theme">
                        <div class="mb-3"><strong>{{theme}} 테마</strong></div>
                        <div class="row m-0 p-0 mb-5">
                            <div :id="`${theme}_${item}`" :class="{ 'target': targetSticker == `${theme}_${item}` }" class="col-3 mb-3 text-center" v-for="(item, idx) of value" :key="idx" @click="isSticker=!isSticker;selectSticker(`${theme}_${item}`)">
                                <img :ref="`${theme}_${item}`" class="sticker" :src="require(`@/assets/stickers/${theme}_${item}.png`)">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="isMode=='draw'" style="height: 600px;overflow-y: auto;">
                    <div class="mb-3"><small>굵  기</small></div>
                    <div class="row mb-3 m-0 p-0">
                        <div class="col-md-2 m-0 p-0 m-auto" :class="{ 'target': targetLineWidth == widthStep }" v-for="(widthStep, idx) of ['1', '2', '3', '4', '5']" :key="idx" @click="targetLineWidth=widthStep;lineWidth=widthSteps[idx];">
                            <div :class="`ml-auto mr-auto circle circle-${widthStep}`"></div>
                        </div>
                    </div>
                    <div class="mb-3"><small>색  상</small></div>
                    <div class="mb-5">
                        <input type="color" v-model="lineColor">
                    </div>
                    <div class="mb-3">
                        <button class="btn-custom" @click="clearPath">처음으로</button>
                    </div>
                </div>
            </div>
        </div>
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
            filterCanvas: {},

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
            targetLineWidth: '1',
            widthSteps: [7, 10, 13, 16, 19],
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
            isDraw: false,
            lineColor: '#000',
            lineWidth: 10,
            isErase: false,
        }
    },
    created() {
        this.frame = this.$store.getters.getFrame;
    },
    mounted() {
        this.init();
        window.addEventListener('keydown', this.setKeydownEvent);
    },
    beforeDestroy() {
        this.saveWork();
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
            this.ctx = this.canvas.getContext('2d');
            this.ctx.strokeStyle = '#FFF'

            await this.loadImgCanvas();

            this.setFilterObj();
            this.setMouseEvent();

            this.previewFilter();

            this.initFreeDrawBrush();
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
            this.$store.commit('setImgCanvas', [this.currImg, JSON.stringify(this.canvas.toObject(['id', 'borderColor', 'cornerColor', 'cornerSize', 'transparentCorners']))])
        },

        setMouseEvent() {
            this.canvas.on('mouse:down', (e) => {
                if (e.type == 'path') this.canvas.discardActiveObject().renderAll();
                if (this.isSticker) {
                    this.createObj('sticker', e.pointer.x, e.pointer.y);
                }
            }).on('mouse:up', (e) => {
                if (this.isDraw) {
                    this.saveWork();
                } else if (e.target) {
                    e.target.opacity = 1;
                    this.canvas.renderAll();
                }
            }).on('mouse:move', (e) => {
            }).on('selection:created', (e) => {
                if (e.selected.length > 1) this.canvas.discardActiveObject().renderAll();
                if (e.selected[0].type == 'path') this.canvas.discardActiveObject().renderAll();
            }).on('selection:cleared', (e) => {
                this.saveWork();
                this.canvas.discardActiveObject().renderAll();
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

                this.saveWork();
            }
        },

        async prevImg() {
            if (this.currImg == 1) return;

            this.currImg -= 1;

            await this.loadImgCanvas();
            this.saveWork();
        },

        async nextImg() {
            if (this.currImg == Object.keys(this.images).length) return;

            this.currImg += 1;

            await this.loadImgCanvas();
            this.saveWork();
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

                this.targetFilter = 'normal';
                this.canvas.backgroundColor = '#FFFFFF';
                this.canvas.renderAll();

                this.$store.commit('setImgCanvas', [this.currImg, JSON.stringify(this.canvas.toObject(['id', 'borderColor', 'cornerColor', 'cornerSize', 'transparentCorners']))]);
            }

            this.saveWork();
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

        loadImgFromURL(url) {
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas');
                const img = new Image();

                img.onload = () => {
                    canvas.height = img.height
                    canvas.width = img.width

                    const ctx = canvas.getContext("2d");

                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/png')

                    resolve(dataURL)
                }

                img.src = url;
            })
        },

        createObj(type, left, top) {
            if (type == 'sticker') {
                let image = new fabric.Image(this.$refs[this.targetSticker][0], {
                    left: left,
                    top: top,
                    borderColor: 'red',
                    cornerColor: 'green',
                    cornerSize: 10,
                    transparentCorners: false,
                });
                
                image.left = left - (image.width / 2);
                image.top = top - (image.height / 2);

                this.canvas.add(image);
                this.canvas.renderAll();

                this.isSticker = false;
            }
        },

        createDragObj(type, target, left, top) {
            if (type == 'sticker') {
                fabric.Image.fromURL(target, (img) => {
                    img.left = left - (img.width / 2);
                    img.top = top - (img.height / 2);
                    img.borderColor = 'red',
                    img.cornerColor = 'green',
                    img.cornerSize = 10,
                    img.transparentCorners = false,

                    this.canvas.add(img);
                    this.canvas.renderAll();

                    this.saveWork();
                });

                this.isSticker = false;
                this.targetSticker = null;
            }
        },

        selectSticker(id) {
            if (this.targetSticker == id) this.targetSticker = null;
            else this.targetSticker = id;
        },

        previewFilter() {
            const sampleFilter = Object.keys(this.$refs).filter(item => item.includes('sample'))
            sampleFilter.forEach(async (filter) => {
                const filterName = filter.split('_')[0]
                const canvasId = `${filterName}_canvas`

                this.filterCanvas[canvasId] = new fabric.Canvas(this.$refs[canvasId][0])
                const base64String = await this.loadImgFromURL(this.$refs[filter][0].src);
                const bgImg = await this.loadImgFromBase64(base64String);

                bgImg.filters = [this.filters[filterName]];
                bgImg.applyFilters();

                this.filterCanvas[canvasId].setBackgroundImage(bgImg, this.filterCanvas[canvasId].renderAll.bind(this.filterCanvas[canvasId]), {
                    scaleX: this.filterCanvas[canvasId].width / bgImg.width,
                    scaleY: this.filterCanvas[canvasId].height / bgImg.height
                })
            })
        },

        async selectFilter(target) {
            if (this.targetFilter == target || target == 'normal') {
                const bgImg = await this.loadImgFromBase64(this.$store.getters.getTmpTarget(this.currImg));

                this.targetFilter = 'normal';
                this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                    scaleX: this.canvas.width / bgImg.width,
                    scaleY: this.canvas.height / bgImg.height
                })
            } else {
                const bgImg = await this.loadImgFromBase64(this.$store.getters.getTmpTarget(this.currImg));

                this.targetFilter = target;
                bgImg.filters = [this.filters[this.targetFilter]];
                bgImg.applyFilters();
                this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas), {
                    scaleX: this.canvas.width / bgImg.width,
                    scaleY: this.canvas.height / bgImg.height
                })
            }

            this.$store.commit('setImgCanvas', [this.currImg, JSON.stringify(this.canvas.toObject(['id', 'borderColor', 'cornerColor', 'cornerSize', 'transparentCorners']))]);
            this.saveWork();
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
            });
        },

        drop(e) {
            const dragImg = e.dataTransfer.getData('text/plain');
            this.createDragObj('sticker', dragImg, e.offsetX, e.offsetY);
        },

        initFreeDrawBrush() {
            this.canvas.freeDrawingBrush.color = this.lineColor;
            this.canvas.freeDrawingBrush.width = this.lineWidth;
            this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
            this.canvas.renderAll();
        },

        setDrawMode() {
            // this.canvas.selectable = this.isDraw;
            this.canvas.renderAll();
        },

        eraseMode() {
            this.isErase = !this.isErase;
            this.canvas.freeDrawingBrush.fillStyle = 'rgba(0,0,0,0)'
            this.canvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
            this.canvas.freeDrawingBrush.globalCompositeOperation = 'destination-out';
            this.canvas.renderAll();
        },
        clearPath() {
            const lineObj = this.canvas.getObjects().filter((item) => item.type == 'path')
            lineObj.forEach((path) => {
                this.canvas.remove(path);
            })

            this.saveWork();
        }
    },
    watch: {
        lineColor(val) {
            this.lineColor = val;
            this.canvas.freeDrawingBrush.color = val
        },
        lineWidth(val) {
            this.canvas.freeDrawingBrush.width = val;
        }
    }
}
</script>

<style lang="scss" scoped>
.decoImg-horizontal {
    height: 450px;
    width: 600px;
    box-shadow: 0.5px 0.5px 1.5px black;
    background-color: #FFF;
}

.decoImg-vertical {
    height: 600px;
    width: 450px;
    box-shadow: 0.5px 0.5px 1.5px black;
    background-color: #FFF;
}

.filterImg-horizontal {
    height: 75px;
    width: 100px;
}

.filterImg-vertical {
    height: 100px;
    width: 75px;
}

.target {
    background-color: grey;
}

.sticker {
    object-fit: contain;
    height: 40px;
    width: 40px;
}

.circle {
    border-radius: 50%;
    background-color: #000;

    &-1 {
        height: 10px;
        width: 10px;
    }

    &-2 {
        height: 15px;
        width: 15px;
    }

    &-3 {
        height: 20px;
        width: 20px;
    }

    &-4 {
        height: 25px;
        width: 25px;
    }

    &-5 {
        height: 30px;
        width: 30px;
    }
}
</style>