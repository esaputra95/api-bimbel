export interface PackageInterface {
    id: string;
    code?: string;
    name: string;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface PackageQueryInterface extends PackageInterface {
    limit: string,
    page: string
}