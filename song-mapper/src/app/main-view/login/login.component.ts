import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authCode: string;

  constructor(
    private route:ActivatedRoute, 
    private router: Router, 
    private authService: AuthService
  ) { }

  processOauth(): void {
    this.authCode = this.route.snapshot.queryParamMap.get('code');
    if(this.authCode === null) {
      this.router.navigate(['error/login']);
    } else {
      this.authService.doLogin(this.authCode).then(() => { 
        this.router.navigate(['home']);
      });
    }
  }

  ngOnInit() {
    this.processOauth();
  }

}
