<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="row w-100 m-0 p-0">
              <div class="col-2"></div>
              <div class="col-8 text-center">
                <strong>{{title}}</strong>
              </div>
              <div class="col-2 text-right">
                <a href="javascript:;" class="btn btn-sm" @click="$emit('on-close')">
                  <i class="mdi mdi-close"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="modal-body d-flex justify-content-center align-items-center">
            {{msg}}
          </div>
          <div class="modal-footer d-block">
            <div class="row w-100 m-0 p-0">
                <button type="button" class="btn btn-sm btn-block text-secondary col-6" @click="$emit('on-close')">
                    <i class="mdi mdi-close"></i> 취소
                </button>
                <button type="button" class="btn btn-sm btn-block text-success col-6" @click="$emit('on-submit')">
                    <i class="mdi mdi-check"></i> 확인
                </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'modal',
    props: {
        title: {
            default: '작업 확인 창',
            type: String,
        },
        msg: {
            default: '정말 진행하시겠습니까?',
            type: String,
        },
    },
  }
</script>

<style lang="scss" scoped>
  .modal-container {
    max-width: 300px;
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

    &-body {
        height: auto;
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
</style>