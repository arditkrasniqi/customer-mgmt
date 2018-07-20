<template>
  <div id="app">
    <a class="logout" @click="logout" v-if="auth.id > 0"><i class="fa fa-sign-out"></i></a>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import service from "./service/index";
import { mapState } from "vuex";
export default {
  name: "App",
  created() {
    if (localStorage.getItem("expiration") !== null) {
      const exp = localStorage.getItem("expiration");
      if (new Date(exp) < new Date()) {
        this.$auth.destroyToken();
        this.$router.push({ name: "Login" });
      }

      service.authUser().then(res => {
        const _user = {
          id: res.endpointResult.id,
          name: res.endpointResult.name,
          email: res.endpointResult.email
        };
        this.$store.commit("setAuthUser", _user);
        this.$router.push({ name: "Customers" });
      });
    }
  },
  methods: {
    logout() {
      this.$auth.destroyToken();
      this.$store.commit("setAuthUser", { id: 0, name: "", email: "" });
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth
    })
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logout {
  position: absolute;
  top: 6px;
  right: 11px;
  font-size: 35px;
  cursor: pointer;
}
</style>
