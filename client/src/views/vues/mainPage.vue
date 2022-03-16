<template>
    <div class="main-page d-flex justify-content-center align-items-center">
        <div class="text-center">
            <div class="title">
                <div><strong>Pick The Memory</strong></div>
                <div class="mb-3"><small>지금 이 순간을 영원히 기억할 수 있어요.</small></div>
                <button class="btn btn-outline-primary" @click="$router.push('/pickMem')">시 작 하 기</button>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'MainPage',

}
</script>

<style scoped>
.title {
    font-size: 25px;
}
</style>