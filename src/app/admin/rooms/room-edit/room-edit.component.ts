import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input('room')
  room!: Room;
  
  constructor() { }

  ngOnInit(): void {
  }

}
