import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Room } from './model/Room';

@Injectable({
  providedIn: 'root'
})
export class PrefetchRoomsService implements Resolve<Observable<Array<Room>>>{

  constructor(private dataService: DataService) { }

  resolve() {
    return this.dataService.getRooms();
  }
}
