<template>
    <div class="footer">
        <div class="w-100 h-100">
            <hr>
            <div class="title m-auto"><strong>{{msg}}</strong></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    props: {
        msg: {
            type: String,
            default: '안녕하세요.'
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 15px;
}

.footer {
    height: 50px;
}
</style>