import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workCanvas: null,
    previewImg: null,
    images: {},
    frame: null,
    selectTarget: {},
    removeQueue: [],
  },
  mutations: {
    setImages(state, imgObj) {
      state.images = imgObj;
    },
    setTarget(state, targetObj) {
      Vue.set(state.selectTarget, targetObj[0], targetObj[1]);
    },
    setTargets(state, targetObj) {
      state.selectTarget = targetObj;
    },
    setRemoveQueue(state, target) {
      state.removeQueue.push(target);
    },
    setUpdateQueue(state, targetArr) {
      state.removeQueue = targetArr;
    },
    setFrame(state, frame) {
      state.frame = frame;
    },
    setCanvas(state, canvas) {
      state.workCanvas = canvas;
    },
    setPreviewImg(state, img) {
      state.previewImg = img
    }
  },
  getters: {
    getImages(state) {
      return state.images;
    },
    getTargets(state) {
      return state.selectTarget;
    },
    getRemoveQueues(state) {
      return state.removeQueue;
    },
    getRemoveQueueCnt(state) {
      return state.removeQueue.length;
    },
    getFrame(state) {
      return state.frame;
    },
    getCanvas(state) {
      return state.workCanvas;
    },
    getPreviewImg(state) {
      return state.previewImg;
    }
  },
  actions: {
  },
  modules: {
  }
})
