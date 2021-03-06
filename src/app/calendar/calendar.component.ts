import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  bookings!: Array<Booking>;
  selectedDate!: string;
  dataLoaded = false;
  message = '';
  isAdmin = false;
  roleSetEventSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.subscribequeryParams();
    if(this.authService.role === 'ADMIN')
      this.isAdmin = true;
    this.loadingSetRole();
  }

  ngOnDestroy(): void {
    this.roleSetEventSubscription.unsubscribe();
  }

  private loadingSetRole() {
    this.roleSetEventSubscription = this.authService.roleSetEvent.subscribe(
      next => {
        if (next === 'ADMIN')
          this.isAdmin = true;
        else
          this.isAdmin = false;
      }
    );
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
    this.message = 'Loading Data...';
    this.dataService.getBookings(this.selectedDate).subscribe(
      bookings => {
        this.bookings = bookings;
        this.dataLoaded = true;
        this.message = '';
      },
      error => {
        this.message = 'Error - Sorry, the data could not be loaded...'
        console.log('get booking fail');
      }
    );
  }

  editBooking(id: number){
    this.router.navigate(['editBooking'], {queryParams: {id : id}});
  }

  addBooking(){
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number){
    this.message = 'Deleting the booking...'
    this.dataService.deleteBooking(id).subscribe(
      next => {
        this.message = '';
        this.loadingBookings();
      },
      error => {
        this.message = 'ERROR - Sorry, this booking could not be deleted'
      }
    );
  }

  onDateChange(){
    this.router.navigate([''], {queryParams : {selectedDate : this.selectedDate}});
  }
}
