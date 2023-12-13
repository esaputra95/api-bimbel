export interface UniversityInterface {
    id: string;
    code?: string;
    name: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface UniversityQueryInterface extends UniversityInterface {
    limit: string,
    page: string
}