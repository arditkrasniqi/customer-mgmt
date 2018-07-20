<template>
    <div class="container">
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="">Name</label>
                <input type="text" v-model="name" class="form-control">
                <div v-if="errors.name !== ''">
                    <span class="text-danger">{{errors.name}}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="">Email</label>
                <input type="text" v-model="email" class="form-control">
                <div v-if="errors.email !== ''">
                    <span class="text-danger">{{errors.email}}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="">Password</label>
                <input type="password" v-model="password" class="form-control">
                <div v-if="errors.password !== ''">
                    <span class="text-danger">{{errors.password}}</span>
                </div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Register</button>
                <router-link :to="{name:'Login'}">Login</router-link>
            </div>
            <div class="form-group" v-if="msg !== ''">
                <div class="alert alert-success">{{msg}}</div>
            </div>
        </form>
    </div>
</template>
<script>
import service from "../service/index.js";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      msg: "",
      errors: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      if (!this.validateEmail(this.email)) {
        this.errors.email = "Please enter valid email address";
        return;
      }
      if (this.name.trim().length < 4) {
        this.errors.name = "Enter at least 4 characters";
        return;
      }
      if (this.password.trim().length < 6) {
        this.errors.password = "Enter at least 4 characters";
        return;
      }
      service
        .register({
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.endpointResult === 200) {
            this.msg = "Registered";
            this.email = "";
            this.name = "";
            this.password = "";
            const _this = this;
            setTimeout(function() {
              _this.$router.push({ name: "Login" });
            }, 1500);
          }
        });
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>

<style>
</style>

