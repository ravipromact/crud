import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { CompanyComponent } from './company/company.component';
import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component';
import { CarouselComponent } from './image-slider/image-slider.component';
const routes: Routes = [
  {path:'admin-list',
  component:AdminListComponent},
  {path:'admin-list/add-admin',component:AddAdminComponent},
  {path:'admin-list/edit-admin/:id',component:EditAdminComponent},
  {path:'company',component:CompanyComponent},
  {path:'report-one',component:ReportOneComponent},
  {path:'report-two',component:ReportTwoComponent},
  {path:'image-slider',component:CarouselComponent},
  {path:'',redirectTo:'admin-list',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
