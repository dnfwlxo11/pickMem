<template>
    <div class="basic-frame">
        <canvas :class="`outter-frame outter-frame-${columns}-${rows}`"></canvas> 
    </div>
</template>

<script>
export default {
    name: 'basicFrame',
    props: {
        rows: {
            default: 2,
            type: Number,
        },
        columns: {
            default: 1,
            type: Number,
        },
    },
}
</script>