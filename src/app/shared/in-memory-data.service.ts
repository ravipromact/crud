import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AdminClass } from './admin.class'
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }
  createDb() {
    const users = [
      {
        id:1,
        firstname:'Rahul',
        surname:'Pawar',
        username:'rpawar',
        email:'rahul@gmail.com',
      },
      {
        id:2,
        firstname:'David',
        surname:'Harbour',
        username:'dharbour',
        email:'david@gmail.com',
      },
      {
        id:3,
        firstname:'Robert',
        surname:'De Niro',
        username:'alcapone',
        email:'robert@gmail.com',
      }
    ];
    return {users};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: AdminClass[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
