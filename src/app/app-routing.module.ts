import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { TicketFormComponent } from './Components/ticket-form/ticket-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent}, // HomePage
  { path: 'bookticket', component: TicketFormComponent }, // Ticket Booking PAge
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
