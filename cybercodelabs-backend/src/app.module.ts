import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppStatusController } from './app-status.controller';
import { MessagesModule } from './messages/messages.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    MessagesModule,
  ],
  controllers: [AppStatusController],
})
export class AppModule {}
