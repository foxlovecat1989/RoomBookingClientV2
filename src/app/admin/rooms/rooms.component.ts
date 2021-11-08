import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms!: Array<Room>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscribeRooms();
  }


  private subscribeRooms() {
    this.dataService.getRooms().subscribe(
      rooms => {
        this.rooms = rooms;
      },
      errors => {
        console.log('get rooms fail');
      }
    );
  }
}
