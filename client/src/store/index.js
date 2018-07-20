import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export const store = new vuex.Store({
  state: {
    auth: {
      id: 0,
      name: '',
      email: ''
    }
  },
  mutations: {
    setAuthUser: (state, payload) => {
      state.auth = payload;
    }
  }
});
