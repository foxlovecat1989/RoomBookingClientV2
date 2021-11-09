import { findLast } from '@angular/compiler/src/directive_resolver';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  roomForm!: FormGroup;



  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.roomForm = this.formBuilder.group({
      roomName: [this.room.name, Validators.required],
      location: [this.room.location, [Validators.required, Validators.min(2)]]
    });
    for(const key of this.keysOfLayout){
      if(this.dataService.isValidKey(key, Layout)){
        const layoutCapacity = this.room.layoutCapacities.find(layoutCapacity => layoutCapacity.layout === Layout[key]);
        const capacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;  // layoutCapacity could be null
        this.roomForm.addControl(`layout${key}`, this.formBuilder.control(capacity));
      }
    }
  }

  onSubmit(){
    this.extractValueFromForm();
    // save data
    if(this.room.id)  // under edit mode
      this.saveUpdateRoom();
    else              // under add mode
      this.saveAddRoom();
  }

  private saveAddRoom() {
    this.dataService.addRoom(this.room).subscribe(
      room => {
        this.room = room;
        this.router.navigate(['admin', 'rooms'], { queryParams: { id: this.room.id, action: 'view' } });
      },
      error => {
        console.log('add room fail');
      }
    );
  }

  private saveUpdateRoom() {
    this.dataService.updateRoom(this.room).subscribe(
      room => {
        this.room = room;
        this.router.navigate(['admin', 'rooms'], { queryParams: { id: this.room.id, action: 'view' } });
      },
      error => {
        console.log('update room fail');
      }
    );
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
