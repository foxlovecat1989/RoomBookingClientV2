import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users = new Array<User>();
  action!: string;
  selectedUser!: User;
  message = 'Please wait... getting the list of users';
  shouldLoadingData = true;
  timesOfReloadAttempt = 0 ;
  isAdmin = false;
  roleSetEventSubscription!: Subscription;


  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formResetService : FormResetService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadingData();
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

  private subscribequeryParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        this.action = params['action'];
        this.setSelectedUser(id);
        this.handlerReloadFormCondition();
      }
    );
  }

  private handlerReloadFormCondition() {
    if (this.action === 'add')
      this.formResetService.resetUserFormEvent.emit(this.selectedUser);
  }

  private setSelectedUser(id: any) {
    if (id) // under edit mode
      this.selectedUser = this.users.find(user => user.id === +id)!;
    else // under add mode
      this.selectedUser = new User();
  }

  loadingData() {
    this.dataService.getUsers().subscribe(
      users => {
        this.users = users;
        this.shouldLoadingData = false;
        this.subscribequeryParams();
      },
      errors => {
        this.attemptToReloadData();
      }
    );
  }

  private attemptToReloadData() {
    if (this.timesOfReloadAttempt < 10) {
      this.loadingData();
      this.timesOfReloadAttempt++;
    }
    else
      this.message = 'An Error Occurred, please contact support...';
  }

  navigateToAdd(){
    this.router.navigate(['admin', 'users'], {queryParams : {action : 'add'}});
  }

  navigateToView(id: number){
    this.router.navigate(['admin', 'users'], {queryParams : {id : id, action : 'view'}});
  }
}
