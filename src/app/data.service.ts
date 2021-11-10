import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {

  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(environment.restURL + '/api/v1/users' + id);
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
