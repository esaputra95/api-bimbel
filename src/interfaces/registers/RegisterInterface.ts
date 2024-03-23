export interface RegisterInterface {
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

export interface RegisterQueryInterface extends RegisterInterface {
    limit: string,
    page: string,
    status?: string,
    isModule?: string,
}