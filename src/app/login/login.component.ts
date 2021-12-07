import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  message = '';
  name!: string;
  password!: string;
  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      reuslt => {
        if(reuslt){
          // navigation
          const url = this.activatedRoute.snapshot.queryParams['requested'];
          this.router.navigateByUrl(url);
        } else {
          this.message = 'Your name or password was not recognized, please try again...';
        }
      }
    );
    this.authService.checkIfAlreadyAuthenticated();
  }

  onSubmit(){

    this.authService.authenticate(this.name, this.password);
  }
}
