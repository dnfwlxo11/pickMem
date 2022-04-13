<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header" style="border-bottom: 1px solid lightgrey;">
            <div class="row w-100 m-0 p-0">
              <div class="col-2"></div>
              <div class="col-8 d-flex justify-content-center align-items-center">
                <strong>프레임 꾸미기 미리보기</strong>
              </div>
              <div class="col-2 text-right">
                <a href="javascript:;" @click="$emit('on-close')" style="color: black;">
                  <i class="mdi mdi-close"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <preview-frame :rows="rows" :columns="columns"></preview-frame>
          </div>
          <div class="modal-footer d-block">
            <button type="button" class="btn-custom btn-block" @click="$emit('on-close')">
              <i class="mdi mdi-check"></i> 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import previewFrame from '../frames/previewFrame.vue'

  export default {
    name: 'previewModal',
    components: {
      previewFrame,
    },
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

<style lang="scss" scoped>
  .modal-container {
    max-width: 640px;
    margin-top: calc(50%);
  }

  .modal {
    &-mask {
      position: fixed;
      z-index: 1100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s ease;
      overflow: auto;
    }

    &-container {
      margin: 20px auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }

    &-footer {
      padding: .5rem;
      display: block;
    }

    &-header {
      border: 0;
      padding: .5rem;
    }
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  // @media (max-width: 480px) {
  //   .modal-mask {
  //     padding: 15px;
  //   }

  //   .modal-container {
  //     .modal-body {

  //     }
  //   }
  // }
</style>