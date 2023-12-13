export interface TentorNotAvailableInterface {
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

export interface TentorNotAvailableQueryInterface extends TentorNotAvailableInterface {
    limit: string,
    page: string,
    tentorId: string
}