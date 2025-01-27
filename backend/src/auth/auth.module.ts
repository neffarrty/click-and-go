import { Module } from '@nestjs/common'
import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from '@/auth/strategies/local.strategy'
import { LocalGuard } from '@/auth/guards/local.guard'
import { JwtStrategy } from '@/auth/strategies/jwt-access.strategy'
import { JwtGuard } from '@/auth/guards/jwt.guard'

@Module({
  providers: [AuthService, LocalStrategy, LocalGuard, JwtStrategy, JwtGuard],
  imports: [
    JwtModule.register({
      global: true
    }),
    PassportModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
