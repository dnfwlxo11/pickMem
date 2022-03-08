<template>
    <div class="step-one">
        <div>
            <div style="font-size: 20px;">
                <strong>Step 2. 사진 촬영</strong>
                <hr>
            </div>
            <div class="picture mb-3">
                <div v-show="!isLoading" ref="booth">
                    <video v-show="!isPhotoTaken" class="canvas" :width="boothWidth" ref="camera"  :height="500" autoplay></video>
                    <canvas v-show="isPhotoTaken" id="photoTaken" class="canvas" :width="boothWidth" :height="500" ref="canvas"></canvas>
                </div>
                <div v-if="isLoading" style="font-size: 20px;height: 500px;">
                    <div class="text-center">
                        <div><i class="mdi mdi-loading mdi-spin"></i></div>
                        <small>카메라 설정 중</small>
                    </div>
                </div>
                <div class="text-right">
                    ( {{images.length}} / 6 )
                </div>
                <div v-if="images.length < 6" class="takePic d-flex justify-content-center align-items-center ml-auto mr-auto">
                    <i class="mdi mdi-camera-outline" style="font-size: 30px;" @click="takePhoto"></i>
                </div>
                <div v-else class="text-center">
                    <div class="text-center mb-2">다음 단계를 진행해주세요!</div>
                    <div><button class="btn btn-outline-danger" @click="initImage">초기화</button></div>
                </div>
                
            </div>
            <div class="text-center">
                <button class="btn btn-outline-primary mr-3" @click="$emit('on-previous')">이 전 단 계</button>
                <button class="btn btn-outline-primary" @click="showingImage();$emit('on-next')">다 음 단 계</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StepOne',
    components: {
        
    },
    data() {
        return {
            images: [],
            boothWidth: null,
            boothHeight: null,
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
        this.images = this.$store.getters.getImages;
        this.calcBoothSize();
        this.createCameraElement();
    },
    methods: {
        calcBoothSize() {
            this.boothWidth = this.$refs.booth.clientWidth;
            this.boothHeight = this.$refs.booth.clientHeight;
            console.log(this.boothWidth, this.boothHeight, 'init')
        },

        createCameraElement() {
            this.isLoading = true;

            const constraints = (window.constraints = {
                audio: false,
                video: true
            });


            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    this.isLoading = false;
                    alert("카메라 설정 중 에러발생");
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
                this.isShotPhoto = true;

                const FLASH_TIMEOUT = 50;

                setTimeout(() => {
                    this.isShotPhoto = false;
                }, FLASH_TIMEOUT);
            }

            // this.isPhotoTaken = !this.isPhotoTaken;

            const context = this.$refs.canvas.getContext('2d');

            console.log(this.$refs.camera.clientHeight, 'client Heiht')
            
            context.drawImage(this.$refs.camera, 0, 0, this.boothWidth, 500);
            this.saveImage();
        },

        saveImage() {
            const image = this.$refs.canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            this.images.push(image);
        },

        showingImage() {
            this.$store.commit('setImages', this.images);
            // console.log(this.$store.getters.getImages);
        },
        
        initImage() {
            this.$store.commit('setImages', []);
            this.images = [];
        }
    }
}
</script>

<style scoped>
.picture {
    height: 620px;
    /* box-shadow: 0.5px 0.5px 1.5px black; */
}

.takePic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 1px 1px 3px black;
}

video {
    object-fit: cover;
}
</style>