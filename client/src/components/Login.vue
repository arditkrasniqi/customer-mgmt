<template>
    <div class="container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="">Email</label>
                <input type="text" v-model="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="">Password</label>
                <input type="password" v-model="password" class="form-control">
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Login</button>
                <router-link :to="{name:'Register'}">Register</router-link>
            </div>
            <div class="form-group" v-if="error !== ''">
                <div class="alert alert-danger">{{error}}</div>
            </div>
        </form>
    </div>
</template>
<script>
import service from "../service/index";
export default {
  data() {
    return {
      email: "",
      password: "",
      msg: "",
      error: ""
    };
  },
  methods: {
    login() {
      const _this = this;
      service
        .login({ email: this.email, password: this.password })
        .then(res => {
          this.$auth.setToken(
            res.endpointResult.token_type +
              " " +
              res.endpointResult.access_token,
            res.endpointResult.expires_in + Date.now()
          );
          this.error = "";

          window.location.reload();
        })
        .catch(error => {
          this.error = "Wrong email/password";
        });
    }
  }
};
</script>

