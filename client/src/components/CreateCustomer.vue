<template>
    <div class="container">
        <form @submit.prevent="createCustomer">
            <div class="form-group">
                <label for="">Company</label>
                <input type="text" v-model="company" class="form-control">
            </div>

            <div class="form-group">
                <label for="">Name</label>
                <input type="text" v-model="name" class="form-control">
            </div>

            <div class="form-group">
                <label for="">Email</label>
                <input type="text" v-model="email" class="form-control">
            </div>

            <div class="form-group">
                <label for="">Address</label>
                <input type="text" v-model="address" class="form-control">
            </div>
            <button class="btn btn-primary" type="submit">Create Customer</button>
        </form>
    </div>
</template>
<script>
import { mapState } from "vuex";
import service from "../service/index";
export default {
  data() {
    return {
      company: "",
      name: "",
      email: "",
      address: ""
    };
  },
  methods: {
    createCustomer() {
      const _customer = {
        company: this.company,
        name: this.name,
        email: this.email,
        address: this.address,
        userId: this.auth.id
      };

      service.createCustomer(_customer).then(res => {
        if (res.endpointResult === 200) {
          this.$router.push({ name: "Customers" });
        }
      });
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth
    })
  }
};
</script>

