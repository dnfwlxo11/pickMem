<template>
    <div class="step-result">
        <div style="font-size: 20px;">
            <strong>Step 6. 결과물</strong>
            <hr>
        </div>
        <div class="text-center">
            <button class="btn btn-outline-primary mr-3" @click="$emit('on-previous')">이 전 단 계</button>
            <button class="btn btn-outline-primary">공 유 하 기</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'step-result',
}
</script>

<style lang="scss" scoped>

</style>