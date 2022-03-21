<template>
    <div class="nav">
        <div class="text-center mt-auto mb-auto w-100">
            <div class="row m-0 p-0">
                <div class="col-2 m-auto">
                    <div class="step-btn" @click="$emit('on-previous')"><i class="mdi mdi-chevron-left"></i><strong>이전</strong></div>
                </div>
                <div class="col-8">
                    <div class="title"><strong>{{msg}}</strong></div>
                </div>
                <div class="col-2 m-auto">
                    <div class="step-btn" @click="$emit('on-next')"><strong>다음</strong><i class="mdi mdi-chevron-right"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    props: {
        msg: {
            type: String,
            default: 'Pick the Momory'
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 25px;
}

.nav {
    height: 75px;
    border-bottom: 1px solid lightgrey;
}

.step-btn {
    font-size: 18px;
}
</style>