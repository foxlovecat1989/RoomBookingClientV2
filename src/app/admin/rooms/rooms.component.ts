import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit,OnDestroy{

  rooms!: Array<Room>;
  action!: string;
  selectedRoom!: Room;
  shouldLoadingData = true;
  message = 'Please wait... getting the list of rooms';
  timesOfReloadAttempt = 0;
  isAdmin = false;
  roleSetEventSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private formResetService: FormResetService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.subscribeToLoadData();
    if(this.authService.role === 'ADMIN')
      this.isAdmin = true;
    this.loadingSetRole();
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

  ngOnDestroy(): void {
    this.roleSetEventSubscription.unsubscribe();
  }


  private subscribeQueryParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        this.action = params['action'];
        this.setSelectedRoom(id);
        this.handleReloadFormCondition();
      }
    );
  }

  private handleReloadFormCondition() {
    if (this.action === 'add') // reset form
      this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
  }

  private setSelectedRoom(id: any) {
    if (id)   // under edit mode
      this.selectedRoom = this.rooms.find(room => room.id === +id)!;
    else{
      this.selectedRoom = new Room();
    }
  }


  subscribeToLoadData() {
    this.dataService.getRooms().subscribe(
      rooms => {
        this.rooms = rooms;
        this.shouldLoadingData = false;
        this.subscribeQueryParams();
      },
      error => {
        this.message = 'Sorry, Something went wrong - please try again... ' + error.message;
        if(error.status === 402)
          this.message = 'You need to pay for this application.'
        this.attemptToReloadData();
      }
    );
  }

  private attemptToReloadData() {
    if (this.timesOfReloadAttempt < 10) {
      this.subscribeToLoadData();
      this.timesOfReloadAttempt++;
    }
    else
      this.message = 'Sorry, something went wrong, please contact support...';
  }

  navigateToView(id: number){
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : id, action : 'view'}});
  }

  navigateToAdd(){
    this.router.navigate(['admin', 'rooms'], {queryParams : {action: 'add'}});
  }
}
