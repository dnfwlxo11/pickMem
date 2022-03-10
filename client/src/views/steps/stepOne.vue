<template>
    <div class="step-one">
        <div>
            <div style="font-size: 20px;">
                <strong>Step 1. 프레임 고르기</strong>
                <hr>
            </div>
            <div class="frame-list mb-3" style="overflow-y: auto;">
                <div class="w-25">
                    2 Cuts
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <default-frame></default-frame>
                        </div>
                        <!-- <div class="col-6">
                            <onethree-frame></onethree-frame>
                        </div> -->
                        <!-- <div class="col-3">
                            <onefour-frame></onefour-frame>
                        </div> -->
                    </div>
                    3 Cuts
                    <hr>
                    4 Cuts
                    <hr>
                    6 Cuts
                    <hr>
                </div>
                
                
            </div>
            <div class="text-center">
                <button class="btn btn-outline-primary mr-3" @click="$router.push('/')">처 음 으 로</button>
                <button class="btn btn-outline-primary" @click="$emit('on-next')">다 음 단 계</button>
            </div>
        </div>
    </div>
</template>

<script>
import defaultFrame from './frames/defaultFrame.vue'
import onethreeFrame from './frames/onethreeFrame.vue'
import onefourFrame from './frames/onefourFrame.vue'

export default {
    name: 'StepOne',
    components: {
        defaultFrame,
        onethreeFrame,
        onefourFrame
    },
    methods: {
    }
}
</script>

<style scoped>
.frame-list {
    height: 620px;
}
</style>