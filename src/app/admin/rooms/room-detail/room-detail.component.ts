import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { Layout, Room } from 'src/app/model/Room';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  @Input('room')
  room!: Room;
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
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : this.room.id, action : 'edit'}});
  }

  deleteRoom(){
    this.dataService.deleteRoom(this.room.id).subscribe(
      () => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'rooms']);
      },
      error => {
        this.message = 'Sorry, this room cannot be deleted this time.';
      }
    );
  }
}
