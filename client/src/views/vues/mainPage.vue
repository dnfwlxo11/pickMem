<template>
    <div class="main-page d-flex justify-content-center align-items-center" @click="init();$router.push('/pickMem')">
        <div class="text-center">
            <div class="title">
                <div><strong>Pick The Moment</strong></div>    
            </div>
            <div class="sub-title mb-5"><small>무제한으로 원하는 모습을 찍고 꾸미세요!</small></div>

            <span>Click to Start</span>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'MainPage',
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$store.commit('resetState');
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 60px;
}

.sub-title {
    font-size: 25px;
}
</style>