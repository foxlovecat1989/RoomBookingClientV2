import { EventEmitter, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  jwtToken!: string;

  constructor(
    private dataService: DataService
  ) { }

  authenticate(name: string, password: string): boolean{
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.jwtToken = next.result;
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(this.isAuthenticated);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(this.isAuthenticated);
      }
    );

    return this.isAuthenticated;
  }

  getRole(): string | null{
    if(this.jwtToken == null)
      return null;

     const encodedPayload = this.jwtToken.split('.')[1];
     const payload = atob(encodedPayload);

    return JSON.parse(payload).role;
  }
}
