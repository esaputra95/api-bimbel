import { StudyGroupDetailInterface } from "./StudyGroupDetailInterface";

export interface StudyGroupInterface {
    id: string
    name: string | null
    classId: string | null
    guidanceTypeId: string | null
    total: number | null
    userCreate: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
}

export interface StudyGroupPostInterface {
    studyGroup : StudyGroupInterface;
    studyGroupDetails: StudyGroupDetailInterface[]
}

export interface StudyGroupQueryInterface extends StudyGroupInterface {
    limit: string,
    page: string
}