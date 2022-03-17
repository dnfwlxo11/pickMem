    <template>
    <div class="step-four">
        <div class="text-center mb-3">
            <button class="btn btn-outline-primary mr-2" @click="saveWork">저장</button>
            <button class="btn btn-outline-primary mr-2" @click="isWork=!isWork;setWorkMode()">{{isWork ? "수정" : "관전" }}</button>
            <button class="btn btn-outline-primary" @click="isOpen=true">미리보기</button>
        </div>
        <div class="row m-0 p-0 mb-5">
            <div class="col-md-8 m-auto">
                <div class="mb-3 d-flex justify-content-center">
                    <div ref="pic" :class="`outter-frame-${parseInt(frame.split('x')[0])}-${parseInt(frame.split('x')[1])}`" style="position: absolute; padding: 20px; padding-right: 0px;">
                        <div :class="`row p-0 m-0`" v-for="(row, rowIdx) of rowCnt" :key="rowIdx">
                            <div :class="`pl-0 pr-0 inner-frame inner-frame-${columns}-${rows}`" v-for="(col, colIdx) of colCnt" :key="colIdx">
                                <div :class="`inner-frame-${columns}-${rows}`">
                                    <img :src="images[rowIdx*colCnt.length + col]" :id="`canvas-${rowIdx*colCnt.length + col}`" draggable="false">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref="deco">
                        <canvas v-if="frame" :class="`outter-frame outter-frame-${parseInt(frame.split('x')[0])}-${parseInt(frame.split('x')[1])}`" ref="canvas"></canvas>
                    </div>
                </div>
                <div class="text-center">
                    <small>실제 효과들은 사진 뒤에 표시됩니다. <br> 미리보기 모드를 통해 확인할 수 있습니다.</small>
                </div>
            </div>
            <div class="col-md-4">
                <span @click="isMode='bg'">배경색</span> | <span @click="isMode='sticker'">스티커</span>
                <hr>
                <div v-if="isMode=='bg'"  style="height: 400px;overflow-y: auto;">
                    <div v-for="(value, theme) in bg" :key="theme">
                        <div class="mb-3"><strong>{{theme}} 테마</strong></div>
                        <div class="row m-0 p-0 mb-3">
                            <div :class="{ 'target': targetColor == color }" class="col-2 m-0 p-0 pt-1 pb-1" v-for="(color, idx) of value" :key="idx">
                                <div class="bg m-auto" :style="{'background-color': color}" @click="selectBg(color)"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="isMode=='sticker'" style="height: 450px;overflow-y: auto;">
                    <div class="mb-5">
                        <button :class="{'btn-primary': isText, 'btn-outline-primary': !isText}" class="btn mr-3" @click="isText=!isText">텍스트</button>
                        <input type="number" v-model="fontSize">
                    </div>
                    <div>
                        <div v-for="(value, theme) in sticker" :key="theme">
                            <div class="mb-3"><strong>{{theme}} 테마</strong></div>
                            <div class="row m-0 p-0 mb-5">
                                <div :id="`${theme}_${item}`" :class="{ 'target': targetSticker == `${theme}_${item}` }" class="col-3 mb-3 text-center" v-for="(item, idx) of value" :key="idx" @click="isSticker=!isSticker;selectSticker(`${theme}_${item}`)">
                                    <img :ref="`${theme}_${item}`" class="sticker" :src="require(`@/assets/stickers/${theme}_${item}.png`)">
                                </div>
                            </div>
                        </div>
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
    name: 'stepFour',
    components: {
        previewModal,
        previewFrame,
    },
    data() {
        return {
            rows: 2,
            columns: 1,
            rowCnt: [],
            colCnt: [],
            images: {},
            targetSticker: null,
            targetColor: '#00ff0000',
            frame: null,
            isMode: 'bg',
            isWork: false,
            isOpen: false,
            isText: false,
            isSticker: false,
            canvasHeight: null,
            canvasWidth: null,
            canvas: null,
            fontSize: 16,
            sticker: {
                'cute_handdrawn': [],
                'cute_natural_doodle': [],
                'flower_leaf': [],
            },
            bg: {
                'simple': ['#F2F2F3', '#A6A6A6', '#595959', '#262626', '#0D0D0D'],
                'modern': ['#131B26', '#D9B95B', '#D9C484', '#F2ECE4', '#D97D5B'],
                'warm': ['#D9C077', '#F29F05', '#D97904', '#BF4904', '#F2F2F2'],
                'astro': ['#F25E7A', '#4A2B8C', '#5155A6', '#05F2DB', '#F2E963'],
                'cartoon': ['#636AF2', '#41A0F2', '#A2DCF2', '#04D98B', '#F2E205'],
                'ancient': ['#1D5948', '#F2BF5E', '#A6864B', '#F2D091', '#732509'],
            }
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
            let table = this.$store.getters.getTable;

            this.images = this.$store.getters.getTargets;
            this.rows = table.rows;
            this.columns = table.columns;
            this.rowCnt = Array.from({length: table.rows}, (v, i) => i + 1);
            this.colCnt = Array.from({length: table.columns}, (v, i) => i + 1);
            this.sticker.cute_handdrawn = Array.from({length: 6}, (v, i) => i + 1);
            this.sticker.cute_natural_doodle = Array.from({length: 12}, (v, i) => i + 1);
            this.sticker.flower_leaf = Array.from({length: 38}, (v, i) => i + 1);

            this.canvasHeight = this.$refs.canvas.clientHeight;
            this.canvasWidth = this.$refs.canvas.clientWidth;
            this.canvas = new fabric.Canvas(this.$refs.canvas);
            this.canvas.setHeight(this.canvasHeight);
            this.canvas.setWidth(this.canvasWidth);

            if (this.$store.getters.getCanvas) {
                await this.loadCanvasToJSON();
                this.setCanvasOption();
                console.log(this.canvas.backgroundColor, 'load')
                this.targetColor = this.canvas.backgroundColor;
                this.canvas.renderAll();
            }

            this.setMouseEvent();
            this.setWorkMode();
        },
        loadCanvasToJSON() {
            return new Promise((resolve, reject) => {
                this.canvas.loadFromJSON(this.$store.getters.getCanvas, this.canvas.renderAll.bind(this.canvas));
                resolve();
            })
        },
        setMouseEvent() {
            this.canvas.on('mouse:down', (e) => {
                if (!this.isWork) return;

                if (this.isText) {
                    this.createObj('text', e.pointer.x, e.pointer.y);
                } else if (this.isSticker) {
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
            } else if (type == 'sticker') {
                let image = new fabric.Image(this.$refs[this.targetSticker][0], {
                    left: left,
                    top: top
                }, { crossOrigin: 'anonymous'});
                
                this.canvas.add(image);
                this.canvas.renderAll();

                this.isSticker = false;
            }
        },
        saveWork() {
            this.isWork = false;
            this.targetSticker = null,
            this.selectBg(this.targetColor);
            this.setWorkMode();
            this.$store.commit('setCanvas', JSON.stringify(this.canvas.toObject(['id'])));
            this.$store.commit('setFrameImg', this.canvas.toDataURL({ format: 'image/png' }));
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
        selectSticker(id) {
            if (this.targetSticker == id) this.targetSticker = null;
            else this.targetSticker = id;
        },
        setWorkMode() {
            this.canvas.discardActiveObject().renderAll();

            if (this.isWork) {
                this.$refs.pic.style['z-index'] = 1;
                this.$refs.deco.style['z-index'] = 2;
            } else {
                this.$refs.pic.style['z-index'] = 2;
                this.$refs.deco.style['z-index'] = 1; 
            }
        },
        selectBg(color) {
            this.targetColor = color;
            this.canvas.backgroundColor = color;
            
            this.canvas.renderAll();
        },
    },
}
</script>

<style lang="scss" scoped>
.frame {
    height: 630px;
}

img {
    object-position: center center;
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.bg {
    height: 40px;
    width: 40px;
}

.sticker {
    object-fit: contain;
    height: 40px;
    width: 40px;
}

.outter-frame {
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

.target {
    background-color: grey;
}
</style>