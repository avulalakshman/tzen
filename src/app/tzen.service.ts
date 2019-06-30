import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { College } from './shared/college';
import { LabInfo } from './shared/labinfo';
import { StudentGroup } from './shared/stugroup';
import { Staff } from './shared/staff';
import { Observable } from 'rxjs';
import { Timing } from './shared/timing';
import { Department } from './shared/department';
import { CollegeDto } from './shared/collegedto';
import { ConstraintInfo } from './shared/constraints';



@Injectable({
  providedIn: 'root'
})
export class TzenService {
  
  
 
 
  
  
  
  
 
 
 
  baseUrl = "http://localhost:8080/college/"
  
  // -------------------------- API for Faculty oprations ---------------------- 
  addFaucltyList(cid: string, teacherinfo: Staff[]):Observable<Object>{
    return this.http.post(`${this.baseUrl}/${cid}/staff/addstafflist`, teacherinfo);
  }

  addFaculty(cid: any, staff: Staff): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${cid}/staff/addstaff`, staff);
  }

  deleteStaff(cid: string, id: string) {
    return this.http.delete(`${this.baseUrl}/${cid}/staff/deletestaff/${id}`)
    
  }
  getFacultyList(cid: any) {
    return this.http.get<Staff[]>(`${this.baseUrl}${cid}/staff/`);
  }

  // -------------------------- End of API for Faculty oprations ---------------------- 

  // --------------------------- API to update timing ---------------------------------

  updateTiming(cid: string, timinglst:Timing[]):Observable<Timing[]> {
    return this.http.post<Timing[]>(`${this.baseUrl}${cid}/timing/`,timinglst);
  }

  getTiming(cid: string){
    return this.http.get<Timing[]>(`${this.baseUrl}${cid}/timing/`);
  }
  // --------------------------- End of update timing ---------------------------------


  getLabsInfo(cid: string) {
    return this.http.get<LabInfo[]>(`${this.baseUrl}${cid}/lab/`);
  }

  addLabInfo(cid: string, labInfo: LabInfo):Observable<Object> {
    return this.http.post(`${this.baseUrl}${cid}/lab/addlab`,labInfo);
  }

  deleteLabInfo(cid: string, id: string) {
  
    return this.http.delete(`${this.baseUrl}  ${cid}/lab/deletelab/${id}`)
  }

  addLabsInfoList(cid: string, labsInfo: LabInfo[]) {
    return this.http.post<Timing[]>(`${this.baseUrl}${cid}/lab/addlablist`,labsInfo);
  }

  addDept(cid: string, dept:Department) {
    return this.http.post<Timing[]>(`${this.baseUrl}${cid}/dept/adddept`,dept);
  }

  saveTimeTableOutput(timeTableOutput: any): any {
    return this.http.post<College>("http://localhost:8080/addtimetableoutput", timeTableOutput);
  }

 

  constructor(private http: HttpClient) { }



  saveOrUpdate(college:College) {
    return this.http.post<College>("http://localhost:8080/addcollege",college);
  }

  deleteCollege(cid: string) {
    return this.http.delete<string>("http://localhost:8080/deletecollege" + cid);
  }



  uploadLabInformation(cid:string,formData: FormData, event) {
    return this.http.post<LabInfo[]>('http://localhost:8080/college/${cid}/uploadlabinfo', formData, { reportProgress: true, observe: 'events' });
  }

  uploadTeacherInformation(formData: FormData, event) {
    return this.http.post<Staff[]>("http://localhost:8080/uploadteacherinfo", formData, { reportProgress: true, observe: 'events' });
  }

  uploadStudentGroup(formData: FormData, event,cid,deptId) {
    return this.http.post<CollegeDto>(`${this.baseUrl}uploadstudentgroup/${cid}/${deptId}`, formData, { reportProgress: true, observe: 'events' });
  }


  getCollege(cid: string) {
    return this.http.get<College>('http://localhost:8080/getcollege/' + cid);
  }

  timeTableOutput() {
    return this.http.get<College>('http://localhost:8080/timetableoutput/');
  }

  getCollegeDto(cid: string, deptId: string) {
    return this.http.get<CollegeDto>(`${this.baseUrl}collegedto/${cid}/${deptId}`);
  }

  saveGroupChanges(college: CollegeDto) {
      return this.http.post<CollegeDto>(`${this.baseUrl}updatestugroup`,college)
  }
  
  saveStuGroups(cid: string, deptId: string, studentGroups: StudentGroup[]) {
    console.log("Student Groups:",studentGroups[0][0]);
    return this.http.post<CollegeDto>(`${this.baseUrl}${cid}/{deptId}/stugroup`,studentGroups[0]);
  }

  addConstraints(cid: string, deptId: string, constraintsRequirement: any) {
    return this.http.post<CollegeDto>(`${this.baseUrl}${cid}/${deptId}/updateconstraints`,constraintsRequirement);
  }
  
  getConstraints(){
    return this.http.get<ConstraintInfo[]>(`${this.baseUrl}constraints/`);
  }
  

  generateTtInput(cid: string, deptId: string) {
    return this.http.get<any>(`${this.baseUrl}ttinput/${cid}/${deptId}`);
  }
 


}
