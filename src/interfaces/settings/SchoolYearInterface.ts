export interface SchoolYearInterface {
    id: string;
    name: string;
    startYear: Date;
    endYear: Date;
    description?: string;
    type?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface SchoolYearQueryInterface extends SchoolYearInterface {
    limit: string,
    page: string
}