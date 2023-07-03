import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/supabase.service';
import { Ticket } from 'src/app/Ticket';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})

export class TicketFormComponent {
  // To show tickets
  public showTicket = false;
  // Initially Fetched tickets from Database
  public seats: Ticket[] = []; 
  // Adjusting 7 seats in a row 
  public seatRows: any[] = []; 
  // List of tickets that are booked
  public seatBooked: number[] = []; 

  constructor(
    private readonly supabase: SupabaseService,
  ) {
    // Fetching All the tickets
    this.supabase.getTickets() 
      .then((data: any) => {
        this.seats = data
        // Sorting the array
        this.seats.sort((a, b) => a.seatNumber - b.seatNumber); 
      })
  }

  // Event Handling when Book Tickets Button is clicked
  onSubmit(numTickets: number) {
    // Checking for valid number of tickets
    if (numTickets === null || numTickets===0) { 
      alert("Please Enter correct value")
     return
    }
    // Filtering all the tickets that are not booked
    const availableSeats = this.seats.filter((seats: any) => seats.status === 'Not Booked'); 
    // Selecting the tickets from the unBooked filtered tickets
    const selectedSeats = availableSeats.slice(0, numTickets);
    // To check If we got our required amount of ticket
    if (selectedSeats.length === numTickets) { 
      // Changing the status of all the selected tickets to Booked
      selectedSeats.forEach((seat: any) => {
        seat.status = 'Booked';
        this.seatBooked.push(seat.seatNumber)
      });
      // Updating the Database
      this.supabase.updateTicket(selectedSeats)
      // Seats can be shown now
      this.showTicket = true;
      const rows = Math.ceil(this.seats.length / 7);

      // Adjusting the seats or tickets 7 per rowas per the requirement
      for (let i = 0; i < rows; i++) {
        const rowSeats: any = this.seats.slice(i * 7, (i + 1) * 7);
        this.seatRows.push(rowSeats);
      }
      
    } else {
      // If required seats are not present
      alert('Not enough available seats.');
    }
  }
}
