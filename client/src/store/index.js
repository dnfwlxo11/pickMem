import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: []
  },
  mutations: {
    setImages(state, imgArr) {
      state.images = imgArr;
    }
  },
  getters: {
    getImages(state) {
      return state.images;
    }
  },
  actions: {
  },
  modules: {
  }
})
