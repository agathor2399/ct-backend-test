import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'supplier_station_correlation', versionKey: false })
class SupplierStationCorrelation {
  @Prop({ unique: true })
  code: string;

  @Prop()
  suppliers: string[];
}

export const SupplierStationCorrelationSchema = SchemaFactory.createForClass(
  SupplierStationCorrelation,
);
export type SupplierStationCorrelationDocument = SupplierStationCorrelation & Document;
