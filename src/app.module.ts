import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import environmentVars from '@config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVars],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
