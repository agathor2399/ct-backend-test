import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ServivueloService } from './servivuelo.service';

@Module({
  imports: [HttpService],
  providers: [ServivueloService],
})
export class ServivueloModule {}
