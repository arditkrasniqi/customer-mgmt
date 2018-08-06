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
    this.password = 'test11';
  }

  ngOnInit() {
  }

  login() {
    this.service.login({ email: this.email, password: this.password }).then(response => {
      const headerObj = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + sessionStorage.getItem('token')
      };
      this.service.setAuthHeader(headerObj);
      sessionStorage.setItem('token', response.access_token);
      sessionStorage.setItem('expiration', response.expires_in);
    }).catch(error => console.log('error'));
  }

}
