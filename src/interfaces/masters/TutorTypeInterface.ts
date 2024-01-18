export interface TutorInterface {
    id: string;
    code?: string;
    name: string;
    price: number;
    courseId: string;
    date: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface TutorQueryInterface extends TutorInterface {
    limit: string,
    page: string
}