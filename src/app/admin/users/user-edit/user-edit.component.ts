import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { User } from 'src/app/model/User';
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  @Input('user')
  user!: User;

  @Output('dataChangedEvent')
  dataChangedEvent = new EventEmitter();

  message = '';
  formUser!: User;
  password!: string;
  password2!: string;
  resetEventSubscription!: Subscription;


  nameIsValid = false;
  passwordIsValid = false;
  passwordIsMatch = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formResetService: FormResetService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeFormResetEvent();
  }


  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  private initializeForm() {
    this.copyUserObjectToForm();
    this.checkNameIsValid();
    this.checkPasswordIsValid();
  }


  private subscribeFormResetEvent() {
    this.resetEventSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    );
  }

  private copyUserObjectToForm() {
    this.formUser = Object.assign({}, this.user);
  }

  private saveUpdateUser() {
    this.dataService.updateUser(this.formUser).subscribe(
      user => {
        this.user = user;
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users'], { queryParams: { id: this.user.id, action: 'view' } });
      },
      errors => {
        this.message = 'Error - Saving updating User fail';
      }
    );
  }

  private saveAddUser() {
    this.dataService.addUser(this.formUser, this.password).subscribe(
      user => {
        this.user = user;
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users'], { queryParams: { id: this.user.id, action: 'view' } });
      },
      errors => {
        this.message = 'Error - Saving adding User fail';
      }
    );
  }

  onSubmit(){
    this.message = 'Saving...';
    if(this.user.id)  // under edit mode
      this.saveUpdateUser();
    else              // under add mode
      this.saveAddUser();
  }

  checkPasswordIsValid(){
    if(this.formUser.id){   // under edit mode
      this.passwordIsValid = true;
      this.passwordIsMatch = true;
    }else{              // under add mode
      this.passwordIsMatch = this.password === this.password2;
      if(this.password)   // password could be null
        this.passwordIsValid = this.password.trim().length > 0;
    }
  }

  checkNameIsValid(){
    if(this.formUser.name)  // formUser.name could be null
      this.nameIsValid = this.formUser.name.trim().length > 0;
  }

}
