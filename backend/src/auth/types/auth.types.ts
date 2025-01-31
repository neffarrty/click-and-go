import { User } from '@prisma/client'

export interface IJwtPayload {
  sub: number
  email: string
}

export interface IAuthResponse {
  user: User
  accessToken: string
}
