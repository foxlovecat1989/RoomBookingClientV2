import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Layout, LayoutCapacity, Room } from 'src/app/model/Room';

@Component({
  selector: 'room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input('room')
  room!: Room;
  keysOfLayout = Object.keys(Layout);
  roomForm = new FormGroup(
    {
      roomName : new FormControl('roomName'),
      location : new FormControl('location')
    }
  );
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.putValueIntoForm();
    for(const key of this.keysOfLayout)
      this.roomForm.addControl(`layout${key}`, new FormControl(`layout${key}`));
  }

  private putValueIntoForm() {
    this.roomForm.patchValue(
      {
        roomName: this.room.name,
        location: this.room.location
      }
    );
  }

  onSubmit(){
    this.extractValueFromForm();
    console.log(this.room);
    // call a method to the dataService to save room

  }


  private extractValueFromForm() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.controls['location'].value;
    this.room.layoutCapacities = new Array<LayoutCapacity>();
    for(const key of this.keysOfLayout){
      const layoutCapacity = new LayoutCapacity();
      if(this.dataService.isValidKey(key, Layout)){
        layoutCapacity.layout = Layout[key];
        layoutCapacity.capacity = this.roomForm.controls[`layout${key}`].value;
      }
      this.room.layoutCapacities.push(layoutCapacity);
    }
  }
}
