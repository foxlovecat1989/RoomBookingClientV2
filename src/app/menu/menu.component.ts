import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLogin = false;

  constructor(
    private router : Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      this.isUserLogin = true;
    }
    this.authService.authenticationResultEvent.subscribe(
      next => this.isUserLogin = next
    );
  }
  navigateToRooms(){
    this.router.navigate(['admin', 'rooms']);
  }
  navigateToUsers(){
    this.router.navigate(['admin', 'users']);
  }
  navigateToHome(){
    this.router.navigate(['']);
  }
  logout(){
    this.authService.logout();
    this.navigateToHome();
  }
}
