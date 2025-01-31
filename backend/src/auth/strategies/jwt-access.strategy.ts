import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { IJwtPayload } from '@/auth/types/auth.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET')
    })
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub }
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
