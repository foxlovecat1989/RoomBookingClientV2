import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings!: Array<Booking>;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeBookings();
  }


  private subscribeBookings() {
    this.dataService.getBookings().subscribe(
      bookings => this.bookings = bookings
    );
  }

  editBooking(id: number){
    this.router.navigate(['editBooking'], {queryParams: {id : id}})
  }
}
