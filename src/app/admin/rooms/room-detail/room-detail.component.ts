import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { Layout, Room } from 'src/app/model/Room';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input('room')
  room!: Room;
  @Output('dataChangedEvent')
  dataChangedEvent = new EventEmitter();
  message = '';
  isAdmin = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.getRole() === 'ADMIN')
      this.isAdmin = true;
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
