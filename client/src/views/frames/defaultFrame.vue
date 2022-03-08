<template>
    <div class="default-frame">
        <div>
            <div class="outter-frame mb-3">
                <div class="inner-frame d-flex justify-content-center align-items-center mb-4" ref="booth">
                    <div v-show="!isLoading" class="booth">
                        <video v-show="!isPhotoTaken" ref="camera" class="canvas" :height="boothHeight" :width="boothWidth" autoplay></video>
                        <canvas v-show="isPhotoTaken" id="photoTaken" class="canvas" :height="boothHeight" :width="boothWidth" ref="canvas"></canvas>
                    </div>
                </div>
                <div class="inner-frame d-flex justify-content-center align-items-center">
                    <div class="booth">
                        <video v-show="!isPhotoTaken" ref="camera-2" class="canvas" :height="boothHeight" :width="boothWidth" autoplay></video>
                        <canvas v-show="isPhotoTaken" id="photo-2" class="canvas" :height="boothHeight" :width="boothWidth" ref="canvas-2"></canvas>
                    </div>
                </div>
            </div>
            <div class="takePic d-flex justify-content-center align-items-center ml-auto mr-auto">
                <i class="mdi mdi-camera-outline" style="font-size: 30px;" @click="takePhoto"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DefaultFrame',
    data() {
        return {
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
        this.calcBoothSize();
        this.createCameraElement();
    },
    methods: {
        calcBoothSize() {
            this.boothWidth = this.$refs.booth.clientWidth
            this.boothHeight = this.$refs.booth.clientHeight
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

            this.isPhotoTaken = !this.isPhotoTaken;

            const context = this.$refs.canvas.getContext('2d');
            context.drawImage(this.$refs.camera, 0, 0, this.boothWidth, this.boothHeight);
        },
    }
}
</script>

<style scoped>
.outter-frame {
    padding: 20px;
    height: 500px;
    width: 300px;
    box-shadow: 0.5px 0.5px 1.5px black;
}

.inner-frame {
    height: 40%;
}

.takePic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 1px 1px 3px black;
}

.canvas {
    box-shadow: 0.5px 0.5px 1.5px black;
}

video {
    object-fit: cover;
}
</style>