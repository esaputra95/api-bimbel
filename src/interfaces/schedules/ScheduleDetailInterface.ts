export interface ScheduleDetailInterface {
    id?: string
    scheduleId?: string | null
    studentId: string | null
    userCreate?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
    deletedAt?: Date | null
}

export interface ScheduleDetailQueryInterface extends ScheduleDetailInterface {
    limit: string,
    page: string
}