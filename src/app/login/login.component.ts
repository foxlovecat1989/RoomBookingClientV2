import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = '';
  name!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authService.authenticate(this.name, this.password)){
      // navigation
      const url = this.activatedRoute.snapshot.queryParams['requested'];
      this.router.navigateByUrl(url);
    } else {
      this.message = 'Your name or password was not recognized, please try again...';
    }
  }
}
