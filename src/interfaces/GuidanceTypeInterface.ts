export interface GuidanceTypeInterface {
    id: string;
    name: string;
    total?: number;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface GuidanceTypeQueryInterface extends GuidanceTypeInterface {
    limit: number,
    page: number
}