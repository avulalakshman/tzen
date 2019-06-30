import { Timing } from './timing';
import { LabInfo } from './labinfo';
import { Department } from './department'
import { Staff } from './staff';
export interface College{
    
    cid:string,
    name:string,
    shortName:string,
    code:string,
    workHrs:Timing[],
    labsInfo:LabInfo[],
    teachersInfo:Staff[],
    departments: Department[]
    
}