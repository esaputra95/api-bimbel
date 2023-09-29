export interface ClassMasterInterface {
    id: string;
    code?: string;
    name: string;
    classTypeId?: string;
    method: 'online' | 'offline';
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface ClassMasterQueryInterface extends ClassMasterInterface {
    limit: string,
    page: string
}