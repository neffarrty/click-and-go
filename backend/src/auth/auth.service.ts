import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { RegisterDto } from '@/auth/dto/register.dto'
import { IAuthResponse, IJwtPayload } from '@/auth/types/auth.types'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto, res: Response): Promise<IAuthResponse> {
    const candidate = await this.prisma.user.findFirst({
      where: {
        email: dto.email
      }
    })

    if (candidate) {
      throw new ConflictException('User with such email already exists')
    }

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: await bcrypt.hash(dto.password, 10)
      }
    })

    return this.login(user, res)
  }

  async login(user: User, res: Response): Promise<IAuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(user, 'access'),
      this.generateToken(user, 'refresh')
    ])

    // const maxAge =
    //   this.configService.get<number>('JWT_REFRESH_EXPIRES_IN') * 1000
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return {
      user,
      accessToken
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      throw new UnauthorizedException(
        `User with email '${email}' does not exists`
      )
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password does not match')
    }

    return user
  }

  private async generateToken(
    user: User,
    type: 'access' | 'refresh'
  ): Promise<string> {
    const config = {
      access: {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRES_IN')
      },
      refresh: {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRES_IN')
      }
    }[type]

    const payload: IJwtPayload = { sub: user.id, email: user.email }

    return this.jwtService.signAsync(payload, {
      secret: config.secret,
      expiresIn: config.expiresIn
    })
  }
}
