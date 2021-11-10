import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output('dataChangedEvent')
  dataChangedEvent = new EventEmitter();

  message = '';

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
    this.message = 'deleting...';
    this.dataService.deleteUser(this.user.id).subscribe(
      () => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users']);
      },
      error => {
        this.message = 'Sorry, this user cannot be deleted this time.';
      }
    );
  }

  resetPassword(){
    this.message = 'Please wait...';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      () => {
        this.message = 'Password has been reset...'
      },
      error => {
        this.message = 'Sorry, something went wrong...';
      }
    );
  }
}
