<template>
    <div class="step-five">
        <div style="font-size: 20px;">
            <strong>Step 5. 사진 꾸미기</strong>
            <hr>
        </div>
        <div class="text-center">
            <button class="btn btn-outline-primary mr-3" @click="$emit('on-previous')">이 전 단 계</button>
            <button class="btn btn-outline-primary" @click="$emit('on-next')">다 음 단 계</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'stepFive',
}
</script>

<style lang="scss" scoped>

</style>