import axios from 'axios';
import handlers from './handlers';
import config from '../config/index'

class Service {
  static register(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${config.API_HOSTNAME}/register`, data).then(res => {
        handlers.handleAxiosResponse(res, resolve, reject);
      }).catch(error => {
        handlers.handleAxiosError(error, resolve, reject);
      })
    });
  }

  static login(data) {
    return new Promise((resolve, reject) => {
      const _data = {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        grant_type: config.GRANT_TYPE,
        username: data.email,
        password: data.password
      }

      axios.post(`${config.HOSTNAME}/oauth/token`, _data).then(res => {
        handlers.handleAxiosResponse(res, resolve, reject);
      }).catch(error => {
        handlers.handleAxiosError(error, resolve, reject);
      });
    });
  }

  static authUser() {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      );
      axios.get(`${config.API_HOSTNAME}/user`).then(res => {
        handlers.handleAxiosResponse(res, resolve, reject)
      }).catch(error => {
        handlers.handleAxiosError(error, resolve, reject);
      });
    });
  }

  static createCustomer(customer) {
    return new Promise((resolve, reject) => {
      axios.post(`${config.API_HOSTNAME}/create-customer`, customer).then(res => {
        handlers.handleAxiosResponse(res, resolve, reject)
      }).catch(error => {
        handlers.handleAxiosError(error, resolve, reject);
      });
    });
  }

  static getUserCustomers(userId) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.API_HOSTNAME}/get-user-customers/${userId}`).then(res => {
        handlers.handleAxiosResponse(res, resolve, reject)
      }).catch(error => {
        handlers.handleAxiosError(error, resolve, reject);
      });
    });
  }

  static deleteCustomer(data) {
    return new Promise((resolve, reject) => {
      axios.delete(`${config.API_HOSTNAME}/delete-customer`, {
        data: {
          customerId: data.customerId,
          userId: data.userId,
        }
      }).then(res => {
        handlers.handleAxiosResponse(res, resolve, reject)
      }).catch(error => {
        handlers.handleAxiosError(error, resolve, reject);
      });
    });
  }
}

export default Service;
