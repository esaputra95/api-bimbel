export interface GuidanceTypeInterface {
    id: string;
    name: string;
    total: number;
    type?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface GuidanceTypeQueryInterface extends GuidanceTypeInterface {
    limit: string,
    page: string
}