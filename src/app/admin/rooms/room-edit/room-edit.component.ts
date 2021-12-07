import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Layout, LayoutCapacity, Room } from 'src/app/model/Room';

@Component({
  selector: 'room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit, OnDestroy {

  @Input('room')
  room!: Room;

  @Output('dataChangedEvent')
  dataChangedEvent = new EventEmitter();

  keysOfLayout = Object.keys(Layout);
  roomForm!: FormGroup;
  resetEventSubscription!: Subscription;
  message = '';

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private formRestService: FormResetService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeFormResetEvent();
  }

  private subscribeFormResetEvent() {
    this.resetEventSubscription =
      this.formRestService.resetRoomFormEvent.subscribe(
        room => {
          this.room = room;
          this.initializeForm();
        }
      );
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  private initializeForm() {
    this.roomForm = this.formBuilder.group({
      roomName: [this.room.name, Validators.required],
      location: [this.room.location, [Validators.required, Validators.min(2)]]
    });
    for(const key of this.keysOfLayout){
      if(LayoutCapacity.isValidKey(key)){
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
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'rooms'], { queryParams: { id: this.room.id, action: 'view' } });
      },
      error => {
        this.message = 'Something went wrong, you may wish to try again...'
      }
    );
  }

  private saveUpdateRoom() {
    this.dataService.updateRoom(this.room).subscribe(
      room => {
        this.room = room;
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'rooms'], { queryParams: { id: this.room.id, action: 'view' } });
      },
      error => {
        this.message = 'Something went wrong, you may wish to try again...' + error.status
      }
    );
  }

  private extractValueFromForm() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.controls['location'].value;
    this.room.layoutCapacities = new Array<LayoutCapacity>();
    for(const key of this.keysOfLayout){
      const layoutCapacity = new LayoutCapacity();
      if(LayoutCapacity.isValidKey(key)){
        layoutCapacity.layout = Layout[key];
        layoutCapacity.capacity = this.roomForm.controls[`layout${key}`].value;
      }
      this.room.layoutCapacities.push(layoutCapacity);
    }
  }
}
