import { Injectable } from '@angular/core';
import { EventDTO, EventsClient } from '@redrock/generated-clients/clients';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly evetClient!: EventsClient;

  constructor() {
    this.evetClient = new EventsClient(environment.serverUrl);
   }

   public async get(): Promise<EventDTO[]>{
     return this.evetClient.getAll();
   }

   public async post(event: EventDTO): Promise<EventDTO>{
     return this.evetClient.post(event);
   }
}
