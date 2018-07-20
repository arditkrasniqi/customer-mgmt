<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-left">
        
       <router-link :to="{name:'CreateCustomer'}" class="btn btn-primary text-left"><i class="fa fa-plus"></i></router-link>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center" v-if="spinner" colspan="5">
            <i class="fa fa-spinner fa-spin"></i>
          </td>
        </tr>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{customer.company}}</td>
          <td>{{customer.name}}</td>
          <td>{{customer.email}}</td>
          <td>{{customer.address}}</td>
          <td>
            <button class="btn btn-sm btn-danger" @click="deleteCustomer(customer.id)"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import service from "../service/index";
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      customers: [],
      spinner: true
    };
  },
  mounted() {
    this.getCustomers();
    if (this.auth.id == 0) {
      const _this = this;
      setTimeout(function() {
        _this.getCustomers();
      }, 3000);
    }
  },
  methods: {
    deleteCustomer(customerId) {
      service
        .deleteCustomer({ customerId: customerId, userId: this.auth.id })
        .then(res => {
          this.customers = res.endpointResult.data;
        });
    },
    getCustomers() {
      if (this.auth.id > 0) {
        this.spinner = false;
      }
      service.getUserCustomers(this.auth.id).then(res => {
        this.customers = res.endpointResult.data;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
