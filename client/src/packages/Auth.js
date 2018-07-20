export default function (Vue) {
  Vue.auth = {
    user: null,
    setToken: function (token, exp) {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', exp);
    },
    getToken: function () {
      var token = localStorage.getItem('token')
      var expiration = localStorage.getItem('expiration')

      if (!token || !expiration)
        return null

      if (Date.now() > parseInt(expiration)) {
        this.destroyToken()
        return null
      } else {
        return token
      }
    },
    destroyToken: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
    },
    isAuth: function () {
      if (this.getToken())
        return true
      else
        return false
    },
  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => {
        return Vue.auth;
      }
    }
  })
}
