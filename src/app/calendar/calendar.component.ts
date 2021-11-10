import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings!: Array<Booking>;
  selectedDate!: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscribequeryParams();
  }

  private subscribequeryParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.selectedDate = params['selectedDate'];
        if (!this.selectedDate)
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        this.loadingBookings();
      }
    );
  }

  private loadingBookings() {
    this.dataService.getBookings(this.selectedDate).subscribe(
      bookings => this.bookings = bookings
    );
  }

  editBooking(id: number){
    this.router.navigate(['editBooking'], {queryParams: {id : id}});
  }

  addBooking(){
    this.router.navigate(['editBooking']);
  }

  deleteBooking(id: number){
    this.dataService.deleteBooking(id).subscribe(
      bookings => {
        this.bookings = bookings;
      }
    );
  }

  onDateChange(){
    this.router.navigate([''], {queryParams : {selectedDate : this.selectedDate}});
  }
}
