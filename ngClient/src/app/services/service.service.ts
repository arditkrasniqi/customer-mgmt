import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Service {

  public config: any = {
    API: 'http://localhost:8000/api',
    HOSTNAME: 'http://localhost:8000',
    headers: {}
  };

  constructor(private _http: HttpClient) {
  }

  setAuthHeader(headers) {
    this.config.headers = new HttpHeaders(headers);
  }

  getUserCustomers(id) {
    return new Promise((resolve, reject) => {
      this._http.get(`${this.config.API}/get-user-customers/${id}`, { headers: this.config.headers }).toPromise().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  login(data) {
    const _data = {
      client_id: 2,
      client_secret: 'oRboYSXxYeVFH7sJ4ivoabtr7yaJZUX6EIOFZxv5',
      grant_type: 'password',
      username: data.email,
      password: data.password
    };
    return new Promise((resolve, reject) => {
      this._http.post(`${this.config.HOSTNAME}/oauth/token`, _data).toPromise().then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
