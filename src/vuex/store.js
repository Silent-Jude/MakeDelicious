import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    currentUser: null,
    isLogin: false,
    // token: ''
  },
  mutations: {
    changeUserStatus(state, phone) {
      if (phone) {
        state.currentUser = phone
        state.isLogin = true
      } else if (phone == null) {
        //登出的时候，情况sessionStorage里面的东西
        sessionStorage.setItem("userName", null);
        sessionStorage.setItem("userToken", "");
        state.currentUser = null;
        state.isLogin = false;
        // state.token = "";
      }
    }
  },
  getters: {
    getLogInfo(state) {
      return state.isLogin;
    },
    getCurrentPhone(state) {
      return state.currentPhone
    }
  }
})

export default store
