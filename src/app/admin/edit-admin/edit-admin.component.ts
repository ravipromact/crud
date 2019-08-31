import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminClass } from '../../shared/admin.class'
import { AdminService }  from '../../shared/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html'
})

export class EditAdminComponent implements OnInit {
  user:AdminClass;
  constructor(private route: ActivatedRoute,private adminService: AdminService,private location: Location){ }

  // Initialize the component
  ngOnInit() {
    this.getUserbyId()
  }

  //Method to fetch admin data by ID
  getUserbyId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.adminService.getUserbyId(id)
      .subscribe(user => this.user = user);
  }
  
  //Method to Update admin data fetched through ID
  save(){
    this.adminService.updateUser(this.user).subscribe(()=> this.location.back())
  }
}
