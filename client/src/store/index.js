import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    canNext: false,
    rows: 2,
    columns: 1,
    frameCanvas: null,
    frameImg: null,
    frame: null,
    imgCanvas: {},
    images: {},
    selectTarget: {},
    selectList: {},
    tmpTarget: {},
    orderQueue: [],
  };
};

const state = getDefaultState();

export default new Vuex.Store({
  state: state,
  mutations: {
    setNext(state, val) {
      state.canNext = val;
    },
    setImages(state, imgObj) {
      state.images = imgObj;
    },
    setImgCanvas(state, targetObj) {
      Vue.set(state.imgCanvas, targetObj[0], targetObj[1])
    },
    setTarget(state, targetObj) {
      Vue.set(state.selectTarget, targetObj[0], targetObj[1]);
    },
    setTargetList(state, arr) {
      state.selectList = arr;
    },
    setTargetListRemove(state, idx) {
      console.log(state.selectList, 'store select list')
      Vue.delete(state.selectList, idx);
      // state.selectList.splice(idx - 1, 1);
    },
    setTmpTarget(state, targetObj) {
      Vue.set(state.tmpTarget, targetObj[0], targetObj[1]);
    },
    setTargets(state, targetObj) {
      state.selectTarget = targetObj;
    },
    setTmpTargets(state, targetObj) {
      state.tmpTarget = targetObj;
    },
    setRemoveQueue(state, target) {
      state.orderQueue.push(target);
    },
    setUpdateQueue(state, targetArr) {
      state.orderQueue = targetArr;
    },
    setFrame(state, frame) {
      state.frame = frame;
    },
    setCanvas(state, canvas) {
      state.frameCanvas = canvas;
    },
    setFrameImg(state, img) {
      state.frameImg = img
    },
    setTable(state, table) {
      state.rows = table.rows;
      state.columns = table.columns;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    }
  },
  getters: {
    getNext(state) {
      return state.canNext;
    },
    getImages(state) {
      return state.images;
    },
    getTargets(state) {
      return state.selectTarget;
    },
    getRemoveQueues(state) {
      return state.orderQueue;
    },
    getRemoveQueueCnt(state) {
      return state.orderQueue.length;
    },
    getFrame(state) {
      return state.frame;
    },
    getCanvas(state) {
      return state.frameCanvas;
    },
    getFrameImg(state) {
      return state.frameImg;
    },
    getTable(state) {
      return {
        rows: state.rows,
        columns: state.columns,
      }
    },
    getTmpTargets(state) {
      return state.tmpTarget;
    },
    getTargetList(state) {
      return state.selectList;
    },
    getTmpTarget: (state) => (idx) => {
      return state.tmpTarget[idx];
    },
    getImgCanvas: (state) => (idx) => {
      return state.imgCanvas[idx];
    },
  },
  actions: {
  },
  modules: {
  },
})
