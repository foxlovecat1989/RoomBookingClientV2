import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layout, LayoutCapacity, Room } from './model/Room';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rooms = new Array<Room>();

  constructor() {
    this.generateDummyRooms();
  }

  private generateDummyRooms() {
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.location = 'First Floor';
    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;
    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;
    room1.layoutCapacities.push(capacity1);
    room1.layoutCapacities.push(capacity2);
    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor';
    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;
    room2.layoutCapacities.push(capacity3);
    this.rooms.push(room1);
    this.rooms.push(room2);
  }

  getRooms():Observable<Array<Room>>{
    
    return of(this.rooms);
  }
}
