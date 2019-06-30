import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff/staff.component';
import { LabComponent } from './lab/lab.component';
import { TimingComponent } from './timing/timing.component';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentModule } from './department/department.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CollegeComponent } from './college/college.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StaffComponent,
    LabComponent,
    TimingComponent,
    CollegeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DepartmentModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
