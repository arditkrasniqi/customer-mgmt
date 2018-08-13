import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service.service';
import { TokenManagerService } from '../../../projects/token-manager/src/public_api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private service: Service, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.service.login({ email: this.email, password: this.password }).then(res => {
      const response = Object.assign({ access_token: '', expires_in: '' }, res);
      TokenManagerService.setTokenWithExpiration(response.access_token, Number.parseInt(response.expires_in));

      const headerObj = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + sessionStorage.getItem('token')
      };
      this.service.setAuthHeader(headerObj);
      this.router.navigate(['test-auth']);
    }).catch(error => console.log(error));
  }

}
