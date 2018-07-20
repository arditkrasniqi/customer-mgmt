import Vue from 'vue'
import Router from 'vue-router'
import Customers from '@/components/Customers'
import CreateCustomer from '@/components/CreateCustomer'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Customers',
    component: Customers,
    meta: {
      forAuth: true,
    }
  }, {
    path: '/create-customer',
    name: 'CreateCustomer',
    component: CreateCustomer,
    meta: {
      forAuth: true,
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      forVisitors: true
    }
  }, {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      forVisitors: true
    }
  }]
})
