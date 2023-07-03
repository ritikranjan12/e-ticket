// Connection Service to the Supabase 
import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'
import { Ticket } from './Ticket';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabase: SupabaseClient
  constructor() {
    // Creating Client for connection
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // Function to get all the Tickets from the Database
  async getTickets(): Promise<any> {
    try {
      const { data, error } = await this.supabase.from('tickets').select('*');
      if (error) {
        throw new Error('Error retrieving tickets');
      }
      return data;
    } catch (error) {
      console.error('Error retrieving tickets:', error);
      throw error;
    }
  }

  // Function to Update the ticket once ticket had been booked
  async updateTicket(ticketData: Ticket[]) : Promise<any> {
    // ticketData is the array of tickets that had to be book
    const {error} =  await this.supabase.from('tickets').upsert(ticketData, { onConflict: 'seatNumber' });
    if(error) {
      console.log(error);
      throw error;
    }
    return true;
  }

}
