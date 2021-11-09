import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Booking } from 'src/app/model/Booking';
import { Layout, Room } from 'src/app/model/Room';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking!: Booking;
  rooms!: Array<Room>;
  users!: Array<User>;
  keysOfLayout = Object.keys(Layout);

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadingRooms();
    this.loadingUsers();
    this.loadingBooking();
  }

  onSubmit(){
    if(this.booking.id)   // under edit mode
      this.saveUpdateBooking();
    else                  // under add mode
      this.saveAddBooking();
  }


  private saveAddBooking() {
    this.dataService.addBooking(this.booking).subscribe(
      booking => {
        this.booking = booking;
        this.router.navigate(['']);
      },
      errors => {
        console.log('add booking fail');
      }
    );
  }

  private saveUpdateBooking() {
    this.dataService.updateBooking(this.booking).subscribe(
      booking => {
        this.booking = booking;
        this.router.navigate(['']);
      },
      errors => {
        console.log('update booking fail');
      }
    );
  }

  private loadingBooking() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if(id){
      this.dataService.getBooking(+id).subscribe(
        booking => {
          this.booking = booking;
        },
        errors => {
          console.log('get booking fail');
        }
      );
    } else{
      this.booking = new Booking();
    }

  }

  private loadingUsers() {
    this.dataService.getUsers().subscribe(
      users => this.users = users
    );
  }

  private loadingRooms() {
    this.dataService.getRooms().subscribe(
      rooms => this.rooms = rooms
    );
  }
}
