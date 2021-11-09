import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  navigateToEdit(){
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : this.room.id, action : 'edit'}});
  }

  deleteRoom(){
    this.dataService.deleteRoom(this.room.id).subscribe(
      () => this.router.navigate(['admin', 'rooms'])
    );
  }
}
