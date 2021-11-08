import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
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
}
