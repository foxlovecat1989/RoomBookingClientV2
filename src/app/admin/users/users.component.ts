import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = new Array<User>();
  action!: string;
  selectedUser!: User;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formResetService : FormResetService
  ) { }

  ngOnInit(): void {
    this.subscribeUsers();
    this.subscribequeryParams();
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

  private subscribeUsers() {
    this.dataService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      errors => {
        console.log('get users fail');
      }
    );
  }

  navigateToAdd(){
    this.router.navigate(['admin', 'users'], {queryParams : {action : 'add'}});
  }

  navigateToView(id: number){
    this.router.navigate(['admin', 'users'], {queryParams : {id : id, action : 'view'}});
  }
}
