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

  updateRoom(room: Room) : Observable<any>{

    return of(null);
  }

  addRoom(newRoom : Room) : Observable<any>{

    return of(null);
  }

  deleteRoom(id: number) : Observable<any>{
    return this.http.delete(environment.restURL + '/api/v1/rooms/' + id);
  }



  updateUser(updateUser: User): Observable<any>{


    return of(null);
  }

  addUser(newUser: User): Observable<any>{

    return of(null);
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

}
