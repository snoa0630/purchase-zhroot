import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:localStorage.getItem('username')||"",
    token:localStorage.getItem('token')||""
  },
  mutations: {
    set_info(state,data){
      for(let item in data){
        state[item]=data[item]
        localStorage.setItem(item,data[item])
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
