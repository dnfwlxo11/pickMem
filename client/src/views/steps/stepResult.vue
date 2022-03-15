<template>
    <div class="step-result">
        <div style="font-size: 20px;">
            <strong>Step 6. 결과물</strong>
            <hr>
        </div>
        <div class="frame">
            <div class="mb-5">
                <div ref="result" :class="`m-auto outter-frame outter-frame-${columns}-${rows}`">
                    <result-frame :rows="rows" :columns="columns"></result-frame>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-outline-primary mr-3" @click="$emit('on-previous')">이 전 단 계</button>
            <button class="btn btn-outline-primary mr-3" @click="saveResult">저 장 하 기</button>
            <button class="btn btn-outline-primary">공 유 하 기</button>
        </div>
    </div>
</template>

<script>
import resultFrame from './frames/resultFrame.vue';
import html2canvas from 'html2canvas';

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
    created() {
        let table = this.$store.getters.getTable;

        this.rows = table.rows;
        this.columns = table.columns;
    },
    methods: {
        async saveResult() {
            let result = await html2canvas(this.$refs.result);
            result.style.backgroundColor = '#FFFFFF'

            console.log(result.style.backgroundColor)

            let a = document.createElement("a");
            a.href = result.toDataURL();
            a.download = "Image.png";
            a.click();
        },
    },
}
</script>

<style lang="scss" scoped>
.frame {
    height: 620px;
}

.outter-frame {
    padding: 20px;

    &-1-1 {
        height: 390px;
        width: 440px;
    }
    &-1-2 {
        height: 560px;
        width: 360px;
    }
    &-1-3 {
        height: 565px;
        width: 260px;
    }
    &-1-4 {
        height: 600px;
        width: 220px;
    }
    &-2-1 {
        height: 360px;
        width: 560px;
    }
    &-2-2 {
        height: 560px;
        width: 660px;
    }
    &-2-3 {
        height: 565px;
        width: 460px;
    }
    &-3-1 {
        height: 260px;
        width: 565px;
    }
    &-3-2 {
        height: 460px;
        width: 565px;
    }
    &-4-1 {
        height: 220px;
        width: 600px;
    }
}
</style>