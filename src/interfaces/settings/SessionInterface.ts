export interface SessionInterface {
    id: string;
    code?: string;
    name: string;
    quantity: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface SessionQueryInterface extends SessionInterface {
    limit: string,
    page: string
}