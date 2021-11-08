import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    PageNotFoundComponent,
    RoomsComponent,
    UsersComponent,
    RoomDetailComponent,
    RoomEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
