import Vue from 'vue'
import Vuex from 'vuex'
import { client } from '@/api/api'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    clientList: [],
    endPointList: [],
    tenantList: [],
    usageList: []
  },
  mutations: {
    setClient(state, paylod) {
      state.clientList = [...paylod]
    },
    setPonint (state, paylod) {
      state.endPointList = [...paylod]
    },
    setTenant (state, paylod) {
      state.tenantList = [...paylod]
    },
    setUsages(state, paylod) {
      state.usageList = [...paylod]
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {

  }
})
