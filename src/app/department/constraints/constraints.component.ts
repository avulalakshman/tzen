import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConstraintsRequirement, ConstraintInfo } from 'src/app/shared/constraints';
import { TzenService } from 'src/app/tzen.service';

import { CollegeDto } from 'src/app/shared/collegedto';
import { IdGen } from 'src/app/shared/idgen';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {

  dname: string;
  deptId: string;
  formFConstraints: FormGroup;
  formSConstraints: FormGroup;
  formConstratins: FormGroup;
  cid: string = IdGen.id;
  constraints: any = [];
  college: CollegeDto;
  constraintInfo: ConstraintInfo[] = [];
  selectedConstraints:string[]=[]
  keys:string[] = []
  day_obj = [
    { id: 1, day: 'MON ', value: 'MONDAY' },
    { id: 2, day: 'TUE ', value: 'TUESDAY' },
    { id: 3, day: 'WED ', value: 'WEDNESDAY' },
    { id: 4, day: 'THU ', value: 'THURSDAY' },
    { id: 5, day: 'FRI ', value: 'FRIDAY' },
    { id: 6, day: 'SAT ', value: 'SATRDAY' },
    { id: 7, day: 'SUN ', value: 'SUNDAY' }
  ];
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private tzenService: TzenService) {
    this.route.paramMap.subscribe((paramMap) => {
      this.cid = paramMap.get("cid");
      this.deptId = paramMap.get("deptId");
      this.dname = paramMap.get("dname");
     
    })
      this.initConstraints()
    
  }

  initConstraints(){
    this.tzenService.getConstraints().subscribe((data) => {
      this.constraintInfo = data;
 
    });

  }

  ngOnInit() {

    
  
    const formControls_1 = this.day_obj.map(control => new FormControl(false));
    const formControls_2 = this.day_obj.map(control => new FormControl(false));
  
    

    this.formSConstraints = this.fb.group({
      subjectNames: [""],
      sdays: this.fb.array(formControls_1),
      negate: [false],
      slots: [""]
    });

    this.formFConstraints = this.fb.group({
      facultyNames: [""],
      fdays: this.fb.array(formControls_2),
      negate: [false],
      slots: [""]
    })
   




    this.tzenService.getCollegeDto(this.cid, this.deptId).subscribe((data) => {
      this.college = data;
      this.constraints = this.college.department.constraints;
     
      if (this.constraints == null) {
        this.constraints = {
          subjPrefs: [],
          facultyPrefs: [],
          constraintKeys: []
        }
      }
      this.keys = this.constraints.constraintKeys
    });



  }

  addSubjectConstraints() {
    const sel_days = this.formSConstraints.value.days
      .map((checked, index) => checked ? this.day_obj[index].value : null)
      .filter(value => value !== null);
    console.log("Selected Day: ", sel_days)
    const names = this.formSConstraints.value.subjectNames;
    const slots = this.formSConstraints.value.slots;
    const negate = this.formSConstraints.value.negate;

    console.log(sel_days)
    const entityDaySlotPrefs = {
      days: sel_days != null ? sel_days : [],
      slots: slots != null ? slots.split(",") : [],
      negate: negate ? negate : false,
      entities: names != null ? names.split(",") : []
    }
    this.constraints.subjPrefs.push(entityDaySlotPrefs);
    this.formSConstraints.reset()
    this.college.department.constraints = this.constraints;
    this.tzenService.addConstraints(this.cid, this.deptId, this.constraints).subscribe((data) => {
      this.college = data;
      console.log(this.college);
      this.constraints = this.college.department.constraints;
      console.log(this.constraints);
    })
  }

  addFacultyConstraints() {
    const sel_days = this.formFConstraints.value.days
      .map((checked, index) => checked ? this.day_obj[index].value : null)
      .filter(value => value !== null);
    const names = this.formFConstraints.value.facultyNames;
    const slots = this.formFConstraints.value.slots;
    const negate = this.formFConstraints.value.negate;
    const entityDaySlotPrefs = {
      days: sel_days != null ? sel_days : [],
      slots: slots != null ? slots.split(",") : [],
      negate: negate ? negate : false,
      entities: names != null ? names.split(",") : []
    }
    this.constraints.facultyPrefs.push(entityDaySlotPrefs);
    this.formFConstraints.reset()
    this.college.department.constraints = this.constraints;
    this.tzenService.addConstraints(this.cid, this.deptId, this.constraints).subscribe((data) => {
      this.college = data;
      this.constraints = this.college.department.constraints;
    })

  }
  changeValue(event,constraint){
    if(event.target.checked){
        this.keys.push(constraint.key)
    }else{
      const index = this.keys.indexOf(constraint.key, 0);
       if (index > -1) {
            this.keys.splice(index, 1);
        }
    }
   
  }

  addConstraintsKeys(){
    if (this.constraints.constraintKeys == null)
    {
      this.constraints.constraintKeys = []; 
    }
    this.constraints.constraintKeys=this.keys;
    this.college.department.constraints = this.constraints;
    this.tzenService.addConstraints(this.cid, this.deptId, this.constraints).subscribe((data) => {
      this.constraints = this.college.department.constraints;
     
    })
    this.constraintInfo = [];
    this.initConstraints()
  }

}
