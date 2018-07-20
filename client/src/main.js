// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './packages/Auth'
import vuex from 'vuex'
import {
  store
} from './store/index'
Vue.use(vuex)
Vue.use(Auth)

Vue.config.productionTip = false

router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.isAuth()) {
        next({
          path: '/'
        });
      } else next()
    } else if (to.matched.some(record => record.meta.forAuth)) {
      if (!Vue.auth.isAuth()) {
        next({
          path: '/login'
        });
      } else next()
    } else next()
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
