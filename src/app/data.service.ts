import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<User>(environment.restURL + '/api/v1/users/' + id, {withCredentials : true }).pipe(
      map(
        user => {
          return User.fromHttp(user);
        }
      )
    );
  }

  getUsers(): Observable<Array<User>>{

    return this.http.get<Array<User>>(environment.restURL + '/api/v1/users', {withCredentials : true }).pipe(
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
    return this.http.get<Array<Room>>(environment.restURL + '/api/v1/rooms', {withCredentials : true })
    .pipe(
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
    return this.http.put<Room>(environment.restURL + '/api/v1/rooms', this.getCorrectedRoom(room), {withCredentials : true});
  }

  addRoom(newRoom : Room) : Observable<Room>{
    return this.http.post<Room>(environment.restURL + '/api/v1/rooms', this.getCorrectedRoom(newRoom), {withCredentials : true });
  }


  deleteRoom(id: number) : Observable<any>{
    return this.http.delete(environment.restURL + '/api/v1/rooms/' + id, {withCredentials : true });
  }

  updateUser(updateUser: User): Observable<User>{
    return this.http.put<User>(environment.restURL + '/api/v1/users', updateUser, {withCredentials : true });
  }

  addUser(newUser: User, password: string): Observable<User>{
    const fullUser = {id : newUser.id, name : newUser.name, password : password };
    return this.http.post<User>(environment.restURL + '/api/v1/users', fullUser, {withCredentials : true });
  }

  deleteUser(id: number) : Observable<any>{
    return this.http.delete(environment.restURL + '/api/v1/users/' + id, {withCredentials : true });
  }

  resetUserPassword(id: number) : Observable<any>{
    return this.http.get(environment.restURL + '/api/v1/users/resetPassword/' + id, {withCredentials : true });
  }

  getBooking(id: number) : Observable<Booking>{
    return this.http.get<Booking>(environment.restURL + '/api/v1/bookings?id=' + id, {withCredentials : true }).pipe(
      map(booking => Booking.fromHttp(booking))
    );
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

  updateBooking(booking: Booking) : Observable<Booking> {
    return this.http.put<Booking>(environment.restURL + '/api/bookings', this.getCorrectedBooking(booking), {withCredentials : true});
  }

  addBooking(newBooking: Booking) : Observable<Booking> {
    return this.http.post<Booking>(environment.restURL + '/api/bookings', this.getCorrectedBooking(newBooking), {withCredentials : true});
  }

  deleteBooking(id : number) : Observable<any>{

    return this.http.delete(environment.restURL + '/api/v1/bookings/' + id, {withCredentials : true });
  }

  private getCorrectedBooking(booking: Booking) {

    let correctLayout;
    for (let member in Layout) {
      if(LayoutCapacity.isValidKey(member)){
        if (Layout[member] === booking.layout) {
          correctLayout = member;
        }
      }
    }

    if (booking.startTime.length < 8) {
      booking.startTime = booking.startTime + ':00';
    }

    if (booking.endTime.length < 8) {
      booking.endTime = booking.endTime + ':00';
    }

    const correctedBooking = {id : booking.id,  room: this.getCorrectedRoom(booking.room), user: booking.user,
      title: booking.title, date: booking.date, startTime: booking.startTime, endTime: booking.endTime,
      participants: booking.participants, layout: correctLayout};

    return correctedBooking;
  }

  getValuesOfLayout(): Observable<Array<string>>{
    const keysOfLayouts = Object.keys(Layout);
    const valuesOfLayouts = new Array<string>();
    for(const key of keysOfLayouts){
      if(LayoutCapacity.isValidKey(key)){
        const valueOfLayout = Layout[key];
        valuesOfLayouts.push(valueOfLayout);
      }
    }

    return of(valuesOfLayouts);
  }

  validateUser(username: string, password: string): Observable<{result : string}>{
    const authData = btoa(`${username}:${password}`);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData);
    return this.http.get<{result : string}>(environment.restURL + '/api/basicAuth/validate', {headers : headers, withCredentials : true});
  }

  getRole() : Observable<{role : string}>{
    const headers = new HttpHeaders().append("X-Requested-With", "XMLHttpRequest");
    return this.http.get<{role : string}>(environment.restURL + '/api/v1/users/currentUserRole', {headers : headers, withCredentials : true});
  }

  logout() : Observable<string>{
    return this.http.get<string>(environment.restURL + '/api/v1/users/logout', {withCredentials : true});
  }

  private getCorrectedRoom(room : Room) {
    const correctedRoom : {'id': number, 'name': string, 'location': string, layoutCapacities : Array<LayoutCapacity>}
      = {id: room.id, name: room.name, location: room.location, layoutCapacities : []};
    for (const lc of room.layoutCapacities) {
      let correctLayout : Layout = Layout.THEATER;
      for (let member in Layout) {
        if(LayoutCapacity.isValidKey(member))
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
