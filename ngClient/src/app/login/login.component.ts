import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service.service';
import { } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private service: Service) {
    this.email = 'test@test.test';
    this.password = '123456';
  }

  ngOnInit() {
  }

  login() {
    this.service.login({ email: this.email, password: this.password }).then(res => {
      const response = Object.assign({ access_token: '', expires_in: '' }, res);
      sessionStorage.setItem('token', response.access_token);
      sessionStorage.setItem('expiration', response.expires_in);

      const headerObj = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + sessionStorage.getItem('token')
      };
      this.service.setAuthHeader(headerObj);
    }).catch(error => console.log(error));
  }

}
