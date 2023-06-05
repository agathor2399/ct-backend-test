import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'journey_destination_tree', versionKey: false })
class JourneyDestinationTree {
  @Prop()
  arrivalCode: string;

  @Prop()
  arrivalTree: string[];

  @Prop()
  destinationCode: string;

  @Prop()
  destinationTree: string[];
}

export const JourneyDestinationTreeSchema = SchemaFactory.createForClass(JourneyDestinationTree);
export type JourneyDestinationTreeDocument = JourneyDestinationTree & Document;
