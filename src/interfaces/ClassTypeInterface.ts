export interface ClassTypeInterface {
    id: string;
    code?: string;
    name: string;
    price: number;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface ClassTypeQueryInterface extends ClassTypeInterface {
    limit: string,
    page: string
}