import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms!: Array<Room>;
  action!: string;
  selectedRoom!: Room;

  constructor(
    private dataService: DataService,
    private router : Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.subscribeRooms();
    this.subscribeQueryParams();
  }


  private subscribeQueryParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        this.action = params['action'];
        this.setSelectedRoom(id);
      }
    );
  }

  private setSelectedRoom(id: any) {
    if (id)
      this.selectedRoom = this.rooms.find(room => room.id === +id)!;

    else
      this.selectedRoom = new Room();
  }

  private subscribeRooms() {
    this.dataService.getRooms().subscribe(
      rooms => {
        this.rooms = rooms;
      },
      errors => {
        console.log('get rooms fail');
      }
    );
  }

  navigateToView(id: number){
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : id, action : 'view'}});
  }

  navigateToAdd(){
    this.router.navigate(['admin', 'rooms'], {queryParams : {action: 'add'}});
  }
}
