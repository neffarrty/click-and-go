import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from '@/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { JwtGuard } from '@/auth/guards/jwt.guard'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    AuthModule,
    PrismaModule
  ]
})
export class AppModule {}
