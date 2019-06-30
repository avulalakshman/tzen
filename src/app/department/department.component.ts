import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TzenService } from '../tzen.service';
import { Department } from '../shared/department';
import { College } from '../shared/college';
import { IdGen } from '../shared/idgen';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  
  formDept: FormGroup;
  college: College;
  cid = IdGen.id;
  show = false;
  departments:Department[]=[]
  constructor(private router: Router, private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private tzenService: TzenService) { }

  ngOnInit() {

    this.formDept = this.fb.group({
      id: [""],
      deptName: [""],
    })
    this.initCollege()
    this.getDepartments()
  }

  open(content) {
    this.modalService.open(content);
  }

  initCollege() {
    this.tzenService.getCollege(this.cid).subscribe((data) => {
      this.college = data;
    })
  }
  addDept() {
    const dept: Department = Object.assign({}, this.formDept.value)
    
    this.tzenService.addDept(this.cid,dept).subscribe((data)=>{
          this.initCollege()
          this.getDepartments();
    });

   
    this.modalService.dismissAll();
  }

  updateCollege(college) {
    this.tzenService.saveOrUpdate(college).subscribe((data) => {
      this.college = college;
      this.getDepartments();
    })
  }

  getDepartments() {
    this.tzenService.getCollege(this.cid).subscribe((data) => {
      this.college = data;
      if (this.college != null) {
        const departments = this.college["departments"];
        this.departments = departments;
        
      }
    
  })
    
  }

}
