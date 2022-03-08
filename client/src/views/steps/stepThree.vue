<template>
    <div class="step-three">
        <div style="font-size: 20px;">
            <strong>Step 3. 사진 고르기</strong>
            <hr>
        </div>
        <div class="row mb-3">
            <div class="col-8 frame d-flex justify-content-center">
                <default-frame></default-frame>
            </div>
            <div class="col-4">
                이미지 리스트
                <hr>
                <div style="height: 550px;overflow-y: auto;">
                    <div v-if="images.length">
                        <div v-for="(item, idx) of images" :key="idx">
                            <img class="previewImg" :src="item" alt="">
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-outline-primary" @click="$emit('on-previous')">이 전 단 계</button>
        </div>
    </div>
</template>

<script>
import defaultFrame from './frames/defaultFrame.vue'

export default {
    name: 'StepThree',
    components: {
        defaultFrame,
    },
    data() {
        return {
            images: []
        }
    },
    mounted() {
        this.images = this.$store.getters.getImages;
        console.log(this.$store.getters.getImages, 'getter')
        console.log(this.images, 'images')
    },
    methods: {

    },
}
</script>

<style scoped>
.frame {
    height: 620px;
}

.previewImg {
    height: 140px;
    width: 200px;
}
</style>