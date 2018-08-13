import { Component, OnInit } from '@angular/core';
import { Service } from './services/service.service';
import { Router } from '@angular/router';
import { TokenManagerService } from '../../projects/token-manager/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private service: Service, private router: Router) {
  }

  ngOnInit() {
    if (TokenManagerService.tokenExists()) {
      const headerObj = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + TokenManagerService.get('token')
      };
      this.service.setAuthHeader(headerObj);
    } else {
      this.router.navigate(['./login']);
    }
  }
}
