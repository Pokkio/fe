const store = Vue.observable({
  color: 'rgb(63, 81, 181)',
  currentPage: 1
})

export const mutations = {
  // 主题颜色
  getColor() {
    return store.color
  },
  setColor(color) {
    store.color = color
  },

  // 当前页码
  getCurrentPage() {
    return store.currentPage
  },
  setCurrentPage(page) {
    store.currentPage = page
  }
}
