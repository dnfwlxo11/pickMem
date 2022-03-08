<template>
    <div class="step-one">
        <div>
            <div style="font-size: 20px;">
                <strong>Step 1. 프레임 고르기</strong>
                <hr>
            </div>
            <div class="frame-list mb-3" style="overflow-y: auto;">

            </div>
            <div class="text-center">
                <button class="btn btn-outline-primary mr-3" @click="$router.push('/')">처 음 으 로</button>
                <button class="btn btn-outline-primary" @click="$emit('on-next')">다 음 단 계</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StepOne',
    components: {   
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