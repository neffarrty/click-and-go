import { NestApplication, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from '@/app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule)
  const port = process.env.PORT || 3000

  app.use(cookieParser())
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (!origin) {
        return callback(null, true)
      }
      callback(null, true)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  await app.listen(port)
}
bootstrap()
