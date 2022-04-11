<template>
    <div class="step-two">
        <div class="mb-5">
            <div v-if="isLoading" style="font-size: 20px;height: 600px;">
                <div class="text-center">
                    <div><i class="mdi mdi-loading mdi-spin"></i></div>
                    <small>카메라 설정 중</small>
                </div>
            </div>
            <div v-else-if="!isLoading && canPhoto" class="d-flex justify-content-center align-items-center">
                <div v-if="rows <= columns" class="camera-horizontal camera-frame">
                    <div class="col-custom h-100 text-center d-flex align-items-center justify-content-center" style="width: 50px;color: #FFF;font-size: 20px;">
                        <div v-if="getImageLen < 6">{{6 - getImageLen}}<br>장<br><br>남<br>았<br>어<br>요<br>!</div>
                        <div v-else>이<br>제<br><br>꾸<br>미<br>러<br><br>가<br>볼<br>까<br>요<br>?</div>
                    </div>
                    <div class="col-custom">
                        <video v-show="!isPhotoTaken" ref="camera" width="600" height="450" autoplay></video>
                        <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" width="600" height="450"></canvas>
                    </div>
                    <div v-if="!isShotPhoto" class="col-custom" style="width: 100px;">
                        <div class="w-100">
                            <div class="d-flex justify-content-center align-items-center" style="height: 75px">
                                <i v-if="isPhotoTaken" class="mdi mdi-trash-can" style="font-size: 30px;color: #FFF;" @click="isPhotoTaken=false"></i>
                            </div>
                            <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                                <div v-if="getImageLen < 6" class="takePic d-flex justify-content-center align-items-center" v-on="isPhotoTaken ? { click:() => { saveImage(); isPhotoTaken=false; }} : { click:() => { takePhoto(); }}">
                                    <div class="takePic-inner"></div>
                                </div>
                                <div v-else-if="getImageLen == 6" class="takePic d-flex justify-content-center align-items-center" style="font-size: 25px;">
                                    <i class="mdi mdi-restore" @click="isOpen=true;"></i>
                                </div>
                            </div>
                            <div style="height: 75px;"></div>
                        </div>
                    </div>
                </div>
                <div v-else class="camera-vertical camera-frame">
                    <div class="d-flex justify-content-center align-items-center" style="height: 50px;color: #FFF;font-size: 20px;">
                        <div v-if="getImageLen < 6">{{6 - getImageLen}} 장 남았어요!</div>
                        <div v-else>이제 꾸미러 가볼까요?</div>
                    </div>
                    <div>
                        <video v-show="!isPhotoTaken" ref="camera" width="450" height="600" autoplay></video>
                        <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" width="450" height="600"></canvas>
                    </div>
                    <div v-if="!isShotPhoto">
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="row m-0 p-0 w-100" style="height: 100px;">
                                <div class="col-2"></div>
                                <div class="col-8 d-flex align-items-center justify-content-center">
                                    <div v-if="getImageLen == 6" class="takePic d-flex justify-content-center align-items-center" style="font-size: 25px;">
                                        <i class="mdi mdi-restore" @click="isOpen=true;"></i>
                                    </div>
                                    <div v-else class="takePic d-flex justify-content-center align-items-center" v-on="isPhotoTaken ? { click:() => { saveImage(); isPhotoTaken=false; }} : { click:() => { takePhoto(); }}">
                                        <div class="takePic-inner"></div>
                                    </div>
                                </div>
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <i v-if="isPhotoTaken" class="mdi mdi-trash-can" style="font-size: 30px;color: #FFF;" @click="isPhotoTaken=false"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="m-auto" style="height: 450px; width: 600px;">
                <div v-if="!getImageLen" class="h-100 card" @click="onUploadClick">
                    <div class="m-auto">
                        <i class="mdi mdi-arrow-up-bold" style="font-size: 70px;"></i>
                        <div><strong>사진 올리기</strong></div>
                    </div>                        
                </div>
                <div v-else class="m-auto h-100">
                    <div class="h-100" style="box-shadow: 1px 1px 3px black;">
                        <div class="m-auto row h-50" v-for="(row, rowIdx) of [0, 1]" :key="rowIdx">
                            <div class="col-4 m-auto" v-for="(col, colIdx) of [0, 1, 2]" :key="colIdx">
                                <div v-if="Object.values(images)[rowIdx*3 + col]" class="card m-auto" style="position: relative;">
                                    <img class="uploadImage" :src="`${Object.values(images)[rowIdx*3 + col]}`">
                                    <div class="overlay"><i class="mdi mdi-close" @click="removeImg(Object.keys(images)[rowIdx*3 + col])"></i></div>
                                </div>
                                <div v-else class="text-center card" @click="onUploadClick">
                                    <i class="mdi mdi-arrow-up-bold" style="font-size: 60px;"></i>
                                    <div><strong>사진 올리기</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="getImageLen == 6" class="text-center"><button class="btn btn-outline-danger" @click="initImage">초기화</button></div>
                </div>
                <div class="text-center" v-if="getImageLen < 6">카메라가 없다면 가지고 계신 사진을 6장까지 넣어주세요!</div>
                <input ref="fileInput" @change="onImageUpload" type="file" style="display: none;" multiple>
            </div>
        </div>
        <modal v-if="isOpen" @on-close="isOpen=false" @on-submit="isOpen=false;initImage()" :title="'사진 삭제'" :msg="'찍은 사진들을 모두 초기화 하시겠어요?'"></modal>
    </div>
</template>

<script>
import Modal from '../../components/modal.vue'

export default {
    name: 'StepOne',
    components: {
        Modal
    },
    data() {
        return {
            images: {},
            rows: 2,
            columns: 1,
            canPhoto: false,
            isOpen: false,
            isCameraOpen: false,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            isTarget: null,
        }
    },
    created() {
        
    },
    mounted() {
        let table = this.$store.getters.getFrame
        console.log(table)
        this.rows = table.split('x')[0];
        this.columns = table.split('x')[1];
        console.log(this.rows, this.columns)
        this.images = this.$store.getters.getImages;

        if (this.getImageLen == 6) this.$store.commit('setNext', true);
        else this.$store.commit('setNext', false);

        this.createCameraElement();
    },
    beforeDestroy() {
        // this.showingImage();
        // this.stopCameraStream();
    },
    methods: {
        createCameraElement() {
            this.isLoading = true;
            let camSize = null
            this.rows <= this.columns ? camSize = { width: 400, height: 300 } : camSize = { width: 300, height: 400 };

            const constraints = (window.constraints = {
                audio: false,
                video: {
                    height: camSize.height,
                    width: camSize.width,
                },
            });

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.canPhoto = true;

                    return stream;
                })
                .then(stream => {
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    console.error(error)
                    this.isLoading = false;
                    this.canPhoto = false;
            });
        },

        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });
        },

        takePhoto() {
            if (!this.isPhotoTaken) {
                this.isPhotoTaken = true;
            } else return;

            const context = this.$refs.canvas.getContext('2d');

            this.rows <= this.columns ? context.drawImage(this.$refs.camera, 0, 0, 600, 450) : context.drawImage(this.$refs.camera, 0, 0, 450, 600);
        },

        saveImage() {
            const image = this.$refs.canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            let id = (new Date).getTime();

            this.$set(this.images, id, image);
        },

        showingImage() {
            this.$store.commit('setImages', this.images);
        },
        
        initImage() {
            this.$store.commit('setNext', false);
            this.$store.commit('setImages', {});
            this.$store.commit('setTargets', {});
            this.$store.commit('setImgCanvas', {});
            this.$store.commit('setTmpTargets', {});
            this.$store.commit('setUpdateQueue', []);
            
            this.images = {};
        },

        removeImg(target) {
            this.images[target] = null;
            this.$delete(this.images, target);
            this.$store.commit('setImages', this.images);
        },

        onUploadClick() {
            this.$refs.fileInput.click();
        },

        async onImageUpload(e) {
            if (this.getImageLen >= 6) return;

            let files = Array.from(e.target.files)

            for await (let file of files) {
                let id = (new Date).getTime();

                if (this.getImageLen >= 6) break;
                this.$set(this.images, id, await this.readFile(file));
            }
        },

        readFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                }
                reader.readAsDataURL(file);
            })
        },
    },
    computed: {
        getImageLen() {
            return Object.keys(this.images).length;
        }
    },
    watch: {
        images: {
            deep: true,
            handler() {
                if (this.getImageLen == 6) this.$store.commit('setNext', true);
                this.showingImage();
            }
        }
    }
}
</script>

<style lang="scss"  scoped>
.col-custom {
    float: left;

    &-50 {
        width: 50px;
    }
    &-100 {
        width: 100px;
    }
    &-600 {
        width: 100px;
    }
}

.camera-frame {
    background-color: black;
}

.camera-horizontal {
    width: 750px;
    height: 450px;
    box-shadow: 1px 1px 3px black;
}

.camera-vertical {
    width: 450px;
    height: 750px;
    box-shadow: 1px 1px 3px black;
}

.takePic {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #FFF;
    border: 1px solid black;
}

.takePic-inner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #FFF;
    border: 2px solid grey;
}

.uploadImage {
    width: 160px;
    height: 120px;
}

.overlay {
    position: absolute;
    font-size: 30px;
    top: 0%;
    left: 0%;
}

.previewImg-horizontal {
    height: 60;
    width: 80;
}

.previewImg-vertical {
    height: 80;
    width: 60;
}

canvas, video {
    object-fit: cover;
}

</style>