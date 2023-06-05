import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import environmentVars from '@config/environment';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { JourneyDestinationTreeSchema } from './schemas/journeyDestinationTree-schema';
import { SupplierStationCorrelationSchema } from './schemas/supplierStationCorrelation-schema';
import { CTSearch } from './domain/entities/ctSearch';
import { CTSearchMongooseRepository } from './infrastructure/repositories/ctSearchMongoose-repository';
import { SaveCTSearchUseCase } from './application/useCases/saveCTSearch-useCase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVars],
    }),
    HttpModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_TRAIN_ENGINE_USER}:${process.env.DB_TRAIN_ENGINE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SEARCHES}`,
    ),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_SEARCHES_USER}:${process.env.DB_SEARCHES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SEARCHES}`,
    ),
    MongooseModule.forFeature([
      { name: 'JourneyDestinationTree', schema: JourneyDestinationTreeSchema },
      { name: 'SupplierStationCorrelation', schema: SupplierStationCorrelationSchema },
      { name: 'CTSearch', schema: CTSearch },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'CTSearchRepository', useClass: CTSearchMongooseRepository },
    { provide: 'SaveCTSearchUseCase', useClass: SaveCTSearchUseCase },
  ],
})
export class AppModule {}
