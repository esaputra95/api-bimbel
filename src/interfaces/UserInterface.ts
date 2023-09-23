export interface UserInterface {
    id: string,
    name: string,
    username: string,
    password: string,
    email?: string | null,
    phone?: string | null,
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface UserQueryInterface extends UserInterface {
    limit: string,
    page: string
}

export interface UserBodyInterface {
    body: UserBodyInterface
}