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
  formUser!: User;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.duplicateUserObjectToForm();
  }

  private duplicateUserObjectToForm() {
    this.formUser = Object.assign({}, this.user);
  }

  private saveUpdateUser() {
    this.dataService.updateUser(this.formUser).subscribe(
      user => {
        this.user = user;
        this.router.navigate(['admin', 'users'], { queryParams: { id: this.user.id, action: 'view' } });
      },
      errors => {
        console.log('update user fail');
      }
    );
  }

  private saveAddUser() {
    this.dataService.addUser(this.formUser).subscribe(
      user => {
        this.user = user;
        this.router.navigate(['admin', 'users'], { queryParams: { id: this.user.id, action: 'view' } });
      },
      errors => {
        console.log('update user fail');
      }
    );
  }

  onSubmit(){
    if(this.user.id)  // under edit mode
      this.saveUpdateUser();
    else              // under add mode
      this.saveAddUser();
  }
}
