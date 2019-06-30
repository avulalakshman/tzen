import { StudentGroup } from "./stugroup";
import { ConstraintsRequirement } from './constraints';

export interface Department{
    deptName:string,
    studentGroups:StudentGroup[],
    constraints:ConstraintsRequirement[]
}