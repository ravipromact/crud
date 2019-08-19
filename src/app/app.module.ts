import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './shared/in-memory-data.service';

import {FlexLayoutModule} from '@angular/flex-layout';
import {DemoMaterialModule} from '../material-module';
import { FormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { AdminListComponent,DeleteUserRecordDialog } from './admin/admin-list/admin-list.component';
import { CompanyComponent } from './company/company.component';
import { AdminService } from './shared/admin.service';
import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component';



@NgModule({
  declarations: [
    AppComponent,
    AddAdminComponent,
    EditAdminComponent,
    CompanyComponent,
    AdminListComponent,
    DeleteUserRecordDialog,
    ReportOneComponent,
    ReportTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  entryComponents:[DeleteUserRecordDialog],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
