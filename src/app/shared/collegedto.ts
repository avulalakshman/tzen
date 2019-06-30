import { Department } from './department';
import { Timing } from './timing';
import { LabInfo } from './labinfo';
import { Staff } from './staff';
export interface CollegeDto{
    cid:string,
    name:string,
    shortName:string,
    code:string,
    workHrs:Timing[],
    labsInfo:LabInfo[],
    teachersInfo:Staff[],
    department: Department
}