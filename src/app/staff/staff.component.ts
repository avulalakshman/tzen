import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Staff } from '../shared/staff';
import { TzenService } from '../tzen.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { timeout } from 'q';
import { IdGen } from '../shared/idgen';




@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class StaffComponent implements OnInit {

  cid = IdGen.id;
  staffList: Staff[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.staffList.length;
  formstaff: FormGroup;
  message = ""
  percentDoneFaculty = 0;
  uploadSuccess = false;
  @ViewChild('myInput',{static:false}) myInputVariable: ElementRef;
  
  constructor(private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private tzenService: TzenService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {

    this.formstaff = this.fb.group({
      id: [""],
      name: [""],
      shortName: [""],
      maxHrsPerWeek: [""],
      deptName: [""],
      buildingName: [""]
    })
    this.stafflist();
  }


  open(content) {
    this.modalService.open(content);
  }
  saveFormData() {
    const staff: Staff = Object.assign({}, this.formstaff.value)
    console.log(staff)
    this.tzenService.addFaculty(this.cid,staff).subscribe((data)=>{
          this.message = data["data"];
          this.stafflist();
    })
    this.modalService.dismissAll();
  }




  stafflist() {
    this.tzenService.getFacultyList(this.cid).subscribe((data) => {
      this.staffList = data;
      this.collectionSize = this.staffList.length;
      this.staffList.map((staff, i) => ({ id: i + 1, ...staff }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
     
    })
   

  };

  get allstaff(){
      return  this.staffList.map((staff, i) => ({ id: i + 1, ...staff }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  

  deleteStaff(staff) {
    this.tzenService.deleteStaff(this.cid,staff.id).subscribe((data)=>{
        this.stafflist();
    })
  }
  editStaff(staff, content) {
    this.modalService.open(content);
    this.formstaff.patchValue({
      id:staff.id,
      name:staff.name,
      deptName :staff.deptName,
      maxHrsPerWeek : staff.maxHrsPerWeek,
      shortName:staff.shortName,
      buildingName:staff.buildingName
    })
  }

  uploadTeacherInformation(event) {
    
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.tzenService.uploadTeacherInformation(formData, event)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDoneFaculty = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
            const teacherinfo: Staff[] = event.body;
            this.addFacultyList(this.cid,teacherinfo);
            
          }
        });
        setTimeout(()=>{    
          this.uploadSuccess = false;
          this.myInputVariable.nativeElement.value ="";
          this.percentDoneFaculty = 0;
         
     }, 3000);
    }
    
  }
  addFacultyList(cid: string, teacherinfo: Staff[]) {
    this.tzenService.addFaucltyList(cid,teacherinfo).subscribe((data)=>{
      this.stafflist();
    })
  }

}
