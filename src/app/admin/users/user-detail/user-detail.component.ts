import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  @Input('user')
  user!: User;

  @Output('dataChangedEvent')
  dataChangedEvent = new EventEmitter();

  message = '';
  isAdmin = false;
  roleSetEventSubscription!: Subscription;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    if(this.authService.role === 'ADMIN')
      this.isAdmin = true;
    this.loadingSetRole();
  }

  ngOnDestroy(): void {
    this.roleSetEventSubscription.unsubscribe();
  }

  private loadingSetRole() {
    this.roleSetEventSubscription = this.authService.roleSetEvent.subscribe(
      next => {
        if (next === 'ADMIN')
          this.isAdmin = true;
        else
          this.isAdmin = false;
      }
    );
  }

  navigateToEdit(){
    this.router.navigate(['admin', 'users'], {queryParams : {id : this.user.id, action : 'edit'}});
  }

  deleteUser(){
    const result = confirm('Are you sure you wish to delete this user ?');
    if(result){
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
