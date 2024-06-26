import { OptionSelectInterface } from "../GlobalInterface"

export interface ScheduleInterface {
    id?: string
    studyGroupId?: string
    date: Date
    tentorId: string
    roomId?: string
    type: Type
    courseId: string
    method?: 'online' | 'offline' | null
    scheduleType: string;
    userCreate: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export enum Type {
    study= "study",
    try_out="try_out"
}

interface ScheduleForm {
    id?: string;
    method: 'online' | 'offline' | null;
    scheduleType: OptionSelectInterface;
    studyGroupId: string;
}

interface ScheduleDetailForm {
    studentId: string;
    id:string
}

interface TimeScheduleForm {
    date: string;
    courseId: string;
    roomId: string;
    tentorId: string;
    type: 'study' | 'try_out'
}
export interface SchedulePostInterface {
    id?: string;
    schedule : ScheduleForm;
    scheduleDetails: ScheduleDetailForm[];
    time: TimeScheduleForm[];
    idDeleteSessionDetails: Delete[]
}

interface Delete {
    id:string
}

export interface ScheduleQueryInterface extends ScheduleInterface {
    limit: string,
    page: string
}