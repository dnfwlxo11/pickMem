<template>
    <div class="nav">
        <div class="text-center mt-auto mb-auto w-100">
            <div class="row m-0 p-0">
                <div class="col-2">
                    <i class="mdi mdi-chevron-left" @click="$emit('on-previous')"></i>
                </div>
                <div class="col-8">
                    <div class="title"><strong>{{msg}}</strong></div>
                </div>
                <div class="col-2">
                    <i class="mdi mdi-chevron-right" @click="$emit('on-next')"></i>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    props: {
        msg: {
            type: String,
            default: 'Pick the Moment'
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 30px;
}

.nav {
    height: 100px;
}

.mdi {
    font-size: 30px;
}
</style>