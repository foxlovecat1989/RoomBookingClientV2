import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input('user')
  user!: User;

  constructor(
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
  }

  navigateToEdit(){
    this.router.navigate(['admin', 'users'], {queryParams : {id : this.user.id, action : 'edit'}});
  }

  deleteUser(){
    this.dataService.deleteUser(this.user.id).subscribe(
      () => {
        this.router.navigate(['admin', 'users']);
      }
    );
  }

  resetPassword(){
    this.dataService.resetUserPassword(this.user.id).subscribe();
  }
}
