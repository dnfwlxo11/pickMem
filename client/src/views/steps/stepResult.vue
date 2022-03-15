<template>
    <div class="step-result">
        <div style="font-size: 20px;">
            <strong>Step 6. 결과물</strong>
            <hr>
        </div>
        <div class="frame">
            <div class="mb-5">
                <div ref="result">
                    <result-frame :rows="rows" :columns="columns"></result-frame>
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-outline-primary mr-3" @click="$emit('on-previous')">이 전 단 계</button>
                <button class="btn btn-outline-primary mr-3" @click="saveResult">저 장 하 기</button>
                <button class="btn btn-outline-primary">공 유 하 기</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import resultFrame from './frames/resultFrame.vue';
import html2convert from 'html2canvas';

export default {
    name: 'step-result',
    components: {
        resultFrame,
    },
    data() {
        return {
            rows: 2,
            columns: 1,
        }
    },
    mounted() {
        let table = this.$store.getters.getTable;

        this.rows = table.rows;
        this.columns = table.columns;
    },
    methods: {
        async saveResult() {
            let result = await html2convert(this.$refs.result);

            let a = document.createElement("a");
            a.href = result.toDataURL();
            a.download = "Image.png";
            a.click();
        },
    },
}
</script>

<style lang="scss" scoped>

</style>