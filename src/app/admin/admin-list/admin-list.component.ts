import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { AdminClass } from '../../shared/admin.class'
import {AdminService} from '../../shared/admin.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})

export class AdminListComponent implements OnInit {
  constructor(private adminService:AdminService,public dialog: MatDialog) { }
  users:AdminClass[]
  dataSource:any;
  companies = [];


  /**
   * Opens dialog
   * @param user --passes the single user record from template to component
   */
  openDialog(user:AdminClass): void {
    
    const dialogRef = this.dialog.open(DeleteUserRecordDialog, {      
      width: '450px',
      panelClass:'deleteUserDialog',
      disableClose:true
    });

    //Method for deleting Admin and filter the data after delete
    dialogRef.componentInstance.deleteAdmin.subscribe(() => {      
      this.users = this.users.filter(h => h !== user);
      this.adminService.deleteUser(user).subscribe();
    });

    
  }
  // Initialize the component
  ngOnInit() {

    //To Bind option for company select options using service
    this.companies = this.adminService.companies

    //Displays All Data in Table using method from service
    this.adminService.getusers().subscribe(users=>this.users=users)    
  }

  //To Display the Admin list according to Material Table Columns
  displayedColumns: string[] = ['ID', 'Firstname', 'Surname', 'Username', 'Email', 'Options'];
  
}


// Delete User Record Dialog Component

@Component({
  selector: 'delete-user-record-dialog',
  templateUrl: 'delete-user-record-dialog.html',
})

export class DeleteUserRecordDialog {
  constructor(public dialogRef: MatDialogRef<DeleteUserRecordDialog>) {}

  //Assigning new EventEnitter
  deleteAdmin = new EventEmitter();

  //Method to delete the record from Admin list by ID
  delete() {
    this.deleteAdmin.emit();
  }
}




