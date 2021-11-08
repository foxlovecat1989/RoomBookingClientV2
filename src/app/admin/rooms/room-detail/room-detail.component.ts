import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Layout, Room } from 'src/app/model/Room';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input('room')
  room!: Room;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToEdit(){
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : this.room.id, action : 'edit'}});
  }

  navigateToDelete(){

  }
}
