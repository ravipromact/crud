import { Component, OnInit } from '@angular/core';
import { AdminClass } from '../../shared/admin.class'
import { AdminService }  from '../../shared/admin.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})

export class AddAdminComponent implements OnInit {
  user:AdminClass[]
  userForm:FormGroup;
  constructor(private adminService: AdminService,private _router:Router,private fb:FormBuilder) { }

  // Initialize the component
  ngOnInit() {

    // Generate Form Controls using FormBuilder
    this.userForm = this.fb.group({
      id: [],
      firstname:['',Validators.required],
      surname: ['',Validators.required],
      username: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]]
    })     
  }


  //To access any form control through the get method on its parent group
  get controls(){ return this.userForm.controls}

  //Function to add new admin to the table
  addUser():void{
    this.adminService.addUser(this.userForm.value).subscribe(user => {
      this._router.navigate(['admin-list'])
    })    
  }

}
