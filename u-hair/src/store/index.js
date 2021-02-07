import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTabBar: 0
  },
  mutations: {
    changeTabBar(state, index) {
      state.currentTabBar = index
    }
  },
  actions: {
  },
  modules: {
  }
})
