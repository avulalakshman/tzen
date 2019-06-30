
export interface StudentGroup{
    name:string,
    size: number,
    deptName:String,
    subjectAllocations:SubjectAllocation[],

}

export interface SubjectAllocation{
    subjectName: string,
    weeklyHrs : number,
    slotDuration:number,
    labNames:string[],
    teacherAllocations: TeacherAllocation[],
    autoDistribution: boolean
}
export interface TeacherAllocation{
    teacherName: string,
    weeklyAllocation: number,
}

