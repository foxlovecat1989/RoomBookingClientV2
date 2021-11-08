import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input('user')
  user!: User;
  message!: string;
  userForm!: User;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = Object.assign({}, this.user);
  }

  onSubmit(){
    this.saveUpdateUser();

  }

  private saveUpdateUser() {
    this.dataService.updateUser(this.userForm).subscribe(
      user => {
        this.user = user;
        this.router.navigate(['admin', 'users'], { queryParams: { id: this.user.id, action: 'view' } });
      },
      errors => {
        console.log('update user fail');
      }
    );
  }
}
