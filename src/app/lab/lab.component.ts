import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabInfo } from '../shared/labinfo';
import { TzenService } from '../tzen.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { IdGen } from '../shared/idgen';


@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  
  labsInfo:LabInfo[]=[];
  page = 1;
  pageSize = 4;
  collectionSize = this.labsInfo.length;
  formlab:FormGroup;
  cid = IdGen.id;
  percentDoneLab = 0;
  uploadSuccess = false;
  @ViewChild('myInput',{static:false}) myInputVariable: ElementRef;
  constructor(private fb: FormBuilder,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private tzenService:TzenService
    ) {
    config.backdrop = 'static';
    config.keyboard = false;

  }
  ngOnInit() {
    this.formlab = this.fb.group({
      id:[""],
      labRoomName: [""],
      capacity: [""],
      deptName: [""],
      buildingName: [""]
    })

    this.getLabsInfo()
  }

  uploadLabInfo(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.tzenService.uploadLabInformation(this.cid,formData, event)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDoneLab = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const uploadedLabs: LabInfo[] = event.body;
            uploadedLabs.forEach(ele => {
              if (this.labsInfo == null ||  this.labsInfo.length == 0) {
                this.labsInfo = [];
              }
              this.labsInfo.push(ele);
              this.uploadSuccess = true;
              
            });
            this.addLabInfoList(this.cid,this.labsInfo);
            
          }
        });
        setTimeout(()=>{    
          this.uploadSuccess = false;
          this.myInputVariable.nativeElement.value ="";
          this.percentDoneLab = 0;
         
     }, 3000);
    }
  }

  addLabInfoList(cid: string, labsInfo: LabInfo[]) {
    console.log(labsInfo)
    this.tzenService.addLabsInfoList(cid,labsInfo).subscribe((data)=>{
      this.getLabsInfo();
    })
  }
  getLabsInfo(){
      this.tzenService.getLabsInfo(this.cid).subscribe((data)=>{
        this.labsInfo = data;
        this.collectionSize = this.labsInfo.length;
        if (this.labsInfo == null){
            this.labsInfo = []
        }
      })
  }
  open(content) {
    this.modalService.open(content);
  }
  saveData() {
    const labInfo: LabInfo = Object.assign({}, this.formlab.value)
    console.log(labInfo)
    this.tzenService.addLabInfo(this.cid,labInfo).subscribe((data)=>{
        this.getLabsInfo()
    })
    this.modalService.dismissAll();
  }
  get labs(): LabInfo[] {
     return this.labsInfo
       .map((lab, i) => ({ id: i + 1, ...lab }))
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  };

  deleteLab(lab){
    console.log(lab)
      return this.tzenService.deleteLabInfo(this.cid,lab.id).subscribe((data)=>{
        this.getLabsInfo()
    })
  }
  editLab(lab, content){
    
    this.modalService.open(content);
    this.formlab.patchValue({
      id:lab.id,
      labRoomName:lab.labRoomName,
      capacity :lab.capacity,
      buildingName : lab.buildingName,
      deptName:lab.deptName,
      
    })
  }

}
