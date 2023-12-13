export interface RoomInterface {
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

export interface RoomQueryInterface extends RoomInterface {
    limit: string,
    page: string
}