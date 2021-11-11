import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from './model/Booking';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rooms = new Array<Room>();
  private users = new Array<User>();
  private bookings = new Array<Booking>();

  constructor(private http: HttpClient) {

  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(environment.restURL + '/api/v1/users/' + id).pipe(
      map(
        user => {
          return User.fromHttp(user);
        }
      )
    );
  }

  getUsers(): Observable<Array<User>>{

    return this.http.get<Array<User>>(environment.restURL + '/api/v1/users').pipe(
      map(
        datas => {
          const users = new Array<User>();
          for(const user of datas)
            users.push(User.fromHttp(user));

          return users;
        }
      )
    );
  }

  getRooms(): Observable<Array<Room>>{
    return this.http.get<Array<Room>>(environment.restURL + '/api/v1/rooms').pipe(
      map(
        datas => {
          const rooms = new Array<Room>();
          datas.forEach(data => rooms.push(Room.fromHttp(data)));
          return rooms;
        }
      )
    );
  }

  updateRoom(room: Room) : Observable<Room>{
    return this.http.put<Room>(environment.restURL + '/api/v1/rooms', this.getCorrectedRoom(room));
  }

  addRoom(newRoom : Room) : Observable<Room>{
    return this.http.post<Room>(environment.restURL + '/api/v1/rooms', this.getCorrectedRoom(newRoom));
  }


  deleteRoom(id: number) : Observable<any>{
    return this.http.delete(environment.restURL + '/api/v1/rooms/' + id);
  }

  updateUser(updateUser: User): Observable<User>{
    return this.http.put<User>(environment.restURL + '/api/v1/users', updateUser);
  }

  addUser(newUser: User, password: string): Observable<User>{
    const fullUser = {id : newUser.id, name : newUser.name, password : password };
    return this.http.post<User>(environment.restURL + '/api/v1/users', fullUser);
  }

  deleteUser(id: number) : Observable<any>{
    return this.http.delete(environment.restURL + '/api/v1/users/' + id);
  }

  resetUserPassword(id: number) : Observable<any>{
    return this.http.get(environment.restURL + '/api/v1/users/resetPassword/' + id);
  }

  getBooking(id: number) : Observable<any>{
    return of(null);
  }

  getBookings(date: string) : Observable<Array<Booking>>{
    return this.http.get<Array<Booking>>(environment.restURL + '/api/v1/bookings/' + date).pipe(
      map(
        bookings => {
          const newbookings = new Array<Booking>();
          bookings.forEach(booking => newbookings.push(Booking.fromHttp(booking)));

          return newbookings;
        }
      )
    );
  }

  updateBooking(booking: Booking) : Observable<any> {

    return of(null);
  }

  addBooking(newBooking: Booking) : Observable<any>{
    return of(null);
  }

  deleteBooking(id : number) : Observable<any>{

    return this.http.delete(environment.restURL + '/api/v1/bookings/' + id);
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

  private getCorrectedRoom(room : Room) {
    const correctedRoom : {'id': number, 'name': string, 'location': string, layoutCapacities : Array<LayoutCapacity>}
      = {id: room.id, name: room.name, location: room.location, layoutCapacities : []};
    for (const lc of room.layoutCapacities) {
      let correctLayout : Layout = Layout.THEATER;
      for (let member in Layout) {
        if(this.isValidKey(member, Layout))
          if (Layout[member] === lc.layout) {
            correctLayout = member;
          }
      }
      const correctedLayout : {'layout': Layout, 'capacity': number}
          = {layout : correctLayout, capacity: lc.capacity};
      correctedRoom.layoutCapacities.push(correctedLayout);
    }
    return correctedRoom;
  }

}
