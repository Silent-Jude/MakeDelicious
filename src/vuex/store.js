import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
<<<<<<< HEAD
    currentPhone: null,
    isLogin: false,
    recommend: [],
=======
    currentUser: null,
    isLogin: false,
>>>>>>> a16eff8f2bdc54a51e59d88d7a561190698bd7ad
    // token: ''
  },
  mutations: {
    changeUserStatus(state, phone) {
      if (phone) {
<<<<<<< HEAD
        state.currentPhone = phone
        state.isLogin = true
        // console.log('vuex中的phone设置完毕')
=======
        state.currentUser = phone
        state.isLogin = true
>>>>>>> a16eff8f2bdc54a51e59d88d7a561190698bd7ad
      } else if (phone == null) {
        //登出的时候，情况sessionStorage里面的东西
        sessionStorage.setItem("userName", null);
        sessionStorage.setItem("userToken", "");
<<<<<<< HEAD
        state.currentPhone = null;
        state.isLogin = false;
        // state.token = "";
      }
    },
    setRecommend(state, arr) {
      state.recommend = arr
      // console.log('vuex里面的recommend设置完毕')
      // console.log(state.recommend)
=======
        state.currentUser = null;
        state.isLogin = false;
        // state.token = "";
      }
>>>>>>> a16eff8f2bdc54a51e59d88d7a561190698bd7ad
    }
  },
  getters: {
    getLogInfo(state) {
      return state.isLogin;
    },
    getCurrentPhone(state) {
      return state.currentPhone
<<<<<<< HEAD
    },
    getRecommend(state) {
      return state.recommend
=======
>>>>>>> a16eff8f2bdc54a51e59d88d7a561190698bd7ad
    }
  }
})

export default store
