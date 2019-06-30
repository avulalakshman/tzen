import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimingComponent } from './timing/timing.component';
import { LabComponent } from './lab/lab.component';
import { StaffComponent } from './staff/staff.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/staff',
    pathMatch: 'full'
  },
  {path: 'staff', component: StaffComponent},
  {path: 'lab', component: LabComponent},
  {path: 'timing', component: TimingComponent},
  
  {
   path:'department',
   loadChildren: 'src/app/department/department.module#DepartmentModule'
  }
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
