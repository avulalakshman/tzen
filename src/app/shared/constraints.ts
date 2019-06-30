
export interface ConstraintsRequirement{

    subjPrefs:EntityDaySlotPrefs[],
    facultyPrefs:EntityDaySlotPrefs[],
    constraintKeys:string[]
}

export interface EntityDaySlotPrefs{

    days:string[],
    slots:number[],
    negate:boolean,
    entities:string[]

}

export interface ConstraintInfo{
    key:string,
    title:string,
    description:string
}

