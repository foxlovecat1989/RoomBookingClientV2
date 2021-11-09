import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rooms = new Array<Room>();
  private users = new Array<User>();

  constructor() {
    this.generateDummyRooms();
    this.generateDummyUsers();
  }

  private generateDummyUsers() {
    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 1;
    user1.name = 'Matt';
    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';
    const user3 = new User();
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
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

  updateRoom(room: Room) : Observable<Room>{
    const originalRoom = this.rooms.find(next => next.id === room.id)!;
    originalRoom.name = room.name;
    originalRoom.location = room.location;
    originalRoom.layoutCapacities = room.layoutCapacities;

    return of(originalRoom);
  }

  addRoom(newRoom : Room) : Observable<Room>{
    let id = 0;
    for(const room of this.rooms){
      if(room.id > id){
        id = room.id;
      }
    }
    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    
    return of(newRoom);
  }



  getUsers(): Observable<Array<User>>{

    return of(this.users);
  }

  updateUser(updateUser: User): Observable<User>{
    const originUser = this.users.find(user => user.id === updateUser.id)!;
    originUser.name = updateUser.name;

    return of(originUser);
  }

  addUser(newUser: User): Observable<User>{
    let id = 0;
    for(const user of this.users){
      if(id < user.id)
        id = user.id;
    }
    newUser.id = id + 1;
    this.users.push(newUser);

    return of(newUser);
  }

  isValidKey(key: string, obj: {[propName: string]: any}) : key is keyof object {
    return key in obj;
  }

}
