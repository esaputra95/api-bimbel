export interface MajorInterface {
    id: string;
    code?: string;
    name: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface MajorQueryInterface extends MajorInterface {
    limit: string,
    page: string
}