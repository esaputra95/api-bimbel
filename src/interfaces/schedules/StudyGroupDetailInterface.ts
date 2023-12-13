export interface StudyGroupDetailInterface {
    id: string
    studyGroupId: string | null
    studentId: string | null
    userCreate: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
}

export interface StudyGroupDetailQueryInterface extends StudyGroupDetailInterface {
    limit: string,
    page: string
}