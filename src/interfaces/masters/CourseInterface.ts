export interface CourseInterface {
    id: string;
    code?: string;
    name: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface CourseQueryInterface extends CourseInterface {
    limit: string,
    page: string
}