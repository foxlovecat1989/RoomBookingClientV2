import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from './model/Booking';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rooms = new Array<Room>();
  private users = new Array<User>();
  private bookings = new Array<Booking>();

  constructor() {
    console.log(environment.restURL);
    this.generateDummyRooms();
    this.generateDummyUsers();
    this.generateDummyBookings();
  }

  private generateDummyBookings() {
    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = this.getRoom(1);
    booking1.user = this.getUser(1);
    booking1.layout = Layout.THEATER;
    booking1.title = 'Example meeting';
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;
    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = this.getRoom(2);;
    booking2.user = this.getUser(2);
    booking2.layout = Layout.USHAPE;
    booking2.title = 'Another meeting';
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking2.startTime = '14:00';
    booking2.endTime = '15:00';
    booking2.participants = 5;
    this.bookings.push(booking1);
    this.bookings.push(booking2);
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

  private getRoom(id: number): Room{
    return this.rooms.find(room => room.id === id)!;
  }

  getRooms():Observable<any>{

    return of(null);
  }

  updateRoom(room: Room) : Observable<any>{

    return of(null);
  }

  addRoom(newRoom : Room) : Observable<any>{

    return of(null);
  }

  deleteRoom(id: number) : Observable<any>{

    return of(null);
  }

  private getUser(id: number) : User{
    return this.users.find(user => user.id === id)!;
  }

  getUsers(): Observable<any>{

    return of(null);
  }

  updateUser(updateUser: User): Observable<any>{


    return of(null);
  }

  addUser(newUser: User): Observable<any>{

    return of(null);
  }

  deleteUser(id: number) : Observable<any>{


    return of(null);
  }

  resetUserPassword(id: number) : Observable<any>{
    return of(null);
  }

  isValidKey(key: string, obj: {[propName: string]: any}) : key is keyof object {
    return key in obj;
  }

  getValuesOfLayout(): Observable<Array<string>>{
    const keysOfLayouts = Object.keys(Layout);
    const valuesOfLayouts = new Array<string>();
    for(const key of keysOfLayouts){
      if(this.isValidKey(key, Layout)){
        const valueOfLayout = Layout[key];
        valuesOfLayouts.push(valueOfLayout);
      }
    }

    return of(valuesOfLayouts);
  }

  getBooking(id: number) : Observable<any>{
    return of(null);
  }

  getBookings(date: string) : Observable<any>{
    return of(null);
  }

  updateBooking(booking: Booking) : Observable<any> {


    return of(null);
  }

  addBooking(newBooking: Booking) : Observable<any>{

    return of(null);
  }

  deleteBooking(id : number) : Observable<any>{


    return of(null);
  }


}
