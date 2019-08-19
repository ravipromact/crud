import { Injectable } from '@angular/core';
import { AdminClass } from './admin.class'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(private http: HttpClient,) { }

  companies = [
    {name:'Company 1'},
    {name:'Company 2'},
    {name:'Company 3'},
    {name:'Company 4'}
  ]
  //api url of the form :base/:collectionName 
  //base is the resource to which requests are made, and collectionName is the data object in 
  //in-memory-data-service.ts.
  private userUrl = 'api/users';

  //HTTP header fields provide required information about the request or response
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // To Get Admin data 
  getusers():Observable<AdminClass[]>{
    return this.http.get<AdminClass[]>(this.userUrl)
  }
  // To Get Admin data by ID
  getUserbyId(id: number): Observable<AdminClass> {
    const url = `${this.userUrl}/${id}`;    
    return this.http.get<AdminClass>(url);
  }
  // To Update Existing Admin Data
  updateUser (user: AdminClass): Observable<any> {
    return this.http.put(this.userUrl, user, this.httpOptions)
  }
  // To Add new Admin
  addUser (user: AdminClass): Observable<AdminClass>{  
    return this.http.post<AdminClass>(this.userUrl,user,this.httpOptions)
  }

  // To Delete Admin by ID
  deleteUser(user: AdminClass | number): Observable<AdminClass> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<AdminClass>(url, this.httpOptions);    
  }
  

}
