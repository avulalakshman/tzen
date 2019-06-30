import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { College } from 'src/app/shared/college';
import { TzenService } from 'src/app/tzen.service';
import { StudentGroup, SubjectAllocation } from 'src/app/shared/stugroup';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { CollegeDto } from 'src/app/shared/collegedto';
import { IdGen } from 'src/app/shared/idgen';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dnames=["CSE","ECE","ISE"]
  dname:string;
  college: CollegeDto = null;
  percentStudentGroup:number;
  uploadSuccess=false;
  cid:string = IdGen.id;
  deptId:string;
  uploadGroupPercentage:number;
  
  @ViewChild('myInput',{static:false}) myInputVariable: ElementRef;
  
  constructor( private tzenService: TzenService,private activeRouter:ActivatedRoute,private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((data)=>{
        const params=this.activeRouter.snapshot.params;
        this.dname = params["dname"];
        this.deptId = params["id"];
        this.tzenService.getCollegeDto(this.cid,this.deptId).subscribe(data => {
               this.college = data;
        });
 
    })
   
  }

  addStudentGroup() {
    if(this.college.department.studentGroups == null){
        this.college.department.studentGroups = [];
    }
    this.college.department.studentGroups.push(this.getStudentGroupEmptyObject());

  }

  addSubject(i) {
    this.college.department.studentGroups[i].subjectAllocations.push(this.getSubjectEmptyObject());

  }
  removeSubject(i: number, j: number) {
    this.college.department.studentGroups[i].subjectAllocations.splice(j, 1);
  }
  // saveAllStudentGroup() {
  //   this.tzenService.addOrUpdateTimeTable(this.college).subscribe(data => {
  //     this.college = data;
  //   })
  // }
  // saveSubjectChanges() {
  //   console.log(this.college);
  //   this.tzenService.addOrUpdateTimeTable(this.college).subscribe(data => {
  //     this.college = data;
  //   })
  // }

  uploadStudentGroup(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
        console.log(file.name)
        this.tzenService.uploadStudentGroup(formData,event,this.cid,this.deptId)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentStudentGroup = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
            this.college = event.body;
   
          }
          this.uploadGroupPercentage = 100;
        });
        setTimeout(()=>{    
          this.uploadSuccess = false;
          this.myInputVariable.nativeElement.value ="";
          this.uploadGroupPercentage = 0;
         
     }, 3000);
    }
  }

  removeStudentGroup(i: number) {
    this.college.department.studentGroups.splice(i, 1);
  }

  addTeacher(i: number, j: number) {

    this.college.department.studentGroups[i].subjectAllocations[j].teacherAllocations.push(
      { teacherName: '', weeklyAllocation: 0 }
    );
  }
  removeTeacher(i: number, j: number, k: number) {
    this.college.department.studentGroups[i].subjectAllocations[j].teacherAllocations.splice(k, 1);
  }
  addLab(subject) {
      subject.labNames.push('');
  }
  removeLab(i: number, j: number, k: number) {
    this.college.department.studentGroups[i].subjectAllocations[j].labNames.splice(k, 1)
  }

  changeValue(subject){
      console.log(subject);
      subject.autoDistribution = !subject.autoDistribution;
      console.log(subject.autoDistribution);
  }

  getStudentGroupEmptyObject() {
    const studentGroup: StudentGroup = {
      name: "Provide Group Name",
      size: 0,
      deptName: "",
      subjectAllocations: [
        {
          subjectName: '',
          weeklyHrs: 0,
          slotDuration: 0,
          teacherAllocations: [
            { teacherName: "", weeklyAllocation: 0 }
          ],
          labNames: ["",""],
          autoDistribution: true
        }
      ]
    };
    return studentGroup;
  }
  getSubjectEmptyObject() {
    const subject: SubjectAllocation =
    {
      subjectName: "",
      weeklyHrs: 0,
      slotDuration: 0,
      teacherAllocations: [
        { teacherName: "", weeklyAllocation: 0 }
      ],
      labNames: [],
      autoDistribution: true
    }
    return subject;
  }

  saveSubjectChanges(){
      console.log(this.college);
      this.tzenService.saveGroupChanges(this.college).subscribe((data)=>{
        console.log(data)
        this.college = data;
      })
  }

  saveStuGroups(studentGroups:StudentGroup[]){
    console.log(studentGroups);
    this.tzenService.saveStuGroups(this.cid,this.deptId,studentGroups).subscribe((data)=>{
      console.log(data)
      this.college = data;
    })
  }
  generateTtInput(){
      this.tzenService.generateTtInput(this.cid,this.deptId).subscribe((data)=>{
            console.log(data);
      })
  }




}
