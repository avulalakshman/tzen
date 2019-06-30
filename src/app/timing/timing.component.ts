import { Component, OnInit } from '@angular/core';
import { Timing } from '../shared/timing';
import { TzenService } from '../tzen.service';
import { IdGen } from '../shared/idgen';

@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css']
})
export class TimingComponent implements OnInit {
 
  cid = IdGen.id;

  headings_timetable = ['Session', 'Mon', 'Tue', "Wed", 'Thu', 'Fri', 'Sat', 'Sun', ''];
  timinglst:Timing[]=[]
  constructor(private tzenService:TzenService) { }

  ngOnInit() {
    this.timing()
  }

  addNewRowTimeTable() {
  
    if (this.timinglst == null || this.timinglst.length == 0) {
      this.timinglst = [];
      this.timinglst.push({ mon: 3, tue: 3, wed: 2, thu: 3, fri: 3, sat: 3, sun: 0 });
      return;
    }
    const s = this.timinglst[this.timinglst.length - 1];
    const newSession = { mon: s.mon, tue: s.tue, wed: s.wed, thu: s.thu, fri: s.fri, sat: s.sat, sun: s.sun }
    this.timinglst.push(newSession);

  }

  removeRowTimeTable(index: number) {
    console.log(index);
    this.timinglst.splice(index, 1);
  }

  timing(){
    this.tzenService.getTiming(this.cid).subscribe((data)=>{
      this.timinglst = data;
  })
  }

  saveChangesTiming(){
      this.tzenService.updateTiming(this.cid,this.timinglst).subscribe((data)=>{
          this.timinglst = data;
      })
  }

}
