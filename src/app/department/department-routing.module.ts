import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { HomeComponent } from './home/home.component';
import { ConstraintsComponent } from './constraints/constraints.component';

const routes: Routes = [
  {
      path:'',
      component:DepartmentComponent,
      children:[{
        path:'home/:dname/:id',
        component:HomeComponent
      },
      {
        path:'constraints/:cid/:deptId/:dname',
        component:ConstraintsComponent
      },
      {
        path:'home/:cid/:deptId',
        component:HomeComponent
      },
    
    ]

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
