export interface IUser {
    id: number
    email: string
    password: string
    status: string
    banned: boolean
    banReason: string
    createdAt: string
    updatedAt: string
}
