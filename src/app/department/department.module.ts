import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';

import { DepartmentComponent } from './department.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConstraintsComponent } from './constraints/constraints.component';
import { MatTabsModule } from '@angular/material';
@NgModule({
  declarations: [ DepartmentComponent, HomeComponent, ConstraintsComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    NgbModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule
    
  ]
})
export class DepartmentModule { }
