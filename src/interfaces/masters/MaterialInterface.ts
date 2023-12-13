export interface MaterialInterface {
    id: string;
    code?: string;
    name: string;
    courseId: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface MaterialQueryInterface extends MaterialInterface {
    limit: string,
    page: string
}