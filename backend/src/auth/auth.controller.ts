import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards
} from '@nestjs/common'
import { User } from '@prisma/client'
import { RegisterDto } from '@/auth/dto/register.dto'
import { LocalGuard } from '@/auth/guards/local.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { AuthService } from '@/auth/auth.service'
import { Public } from '@/shared/decorators/public.decorator'
import { IAuthResponse } from '@/auth/types/auth.types'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAuthResponse> {
    return this.authService.register(dto, res)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAuthResponse> {
    return this.authService.login(user, res)
  }
}
