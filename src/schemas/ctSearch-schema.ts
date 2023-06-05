import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Departure {
  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop()
  station: string;
}

class Arrival extends Departure {}

const DepartureSchema = SchemaFactory.createForClass(Departure);
const ArrivalSchema = SchemaFactory.createForClass(Arrival);

@Schema({ _id: false })
class Duration {
  @Prop()
  hours: number;

  @Prop()
  minutes: number;
}

const DurationSchema = SchemaFactory.createForClass(Duration);

@Schema({ _id: false })
class Journey {
  @Prop({
    type: DepartureSchema,
    default: () => ({ Departure }),
  })
  departure: Departure;

  @Prop({
    type: ArrivalSchema,
    default: () => ({ Arrival }),
  })
  arrival: Arrival;

  @Prop({
    type: DurationSchema,
    default: () => ({ Duration }),
  })
  duration: Duration;
}

const JourneySchema = SchemaFactory.createForClass(Journey);

@Schema({ _id: false })
class Passenger {
  @Prop()
  adults: string;

  @Prop()
  children: string;
}

const PassengerSchema = SchemaFactory.createForClass(Passenger);

@Schema({ _id: false })
class Accommodation {
  @Prop()
  type: string;

  @Prop({
    type: PassengerSchema,
    default: () => ({ Passenger }),
  })
  passengers: Passenger;
}

const AccommodationSchema = SchemaFactory.createForClass(Accommodation);

@Schema({ _id: false })
class Train {
  @Prop()
  type: string;

  @Prop({
    type: [JourneySchema],
    default: [],
  })
  journeys: Journey[];

  @Prop({
    type: AccommodationSchema,
    default: () => ({ Accommodation }),
  })
  accommodations: Accommodation;
}

const TrainSchema = SchemaFactory.createForClass(Train);

@Schema({ _id: false })
class Breakdown {
  @Prop()
  adult: number;

  @Prop()
  children: number;
}

const BreakdownSchema = SchemaFactory.createForClass(Breakdown);

@Schema({ _id: false })
class Price {
  @Prop()
  total: number;

  @Prop({
    type: BreakdownSchema,
    default: () => ({ Breakdown }),
  })
  breakdown: Breakdown;
}

const PriceSchema = SchemaFactory.createForClass(Price);

@Schema({ collection: 'train_results', versionKey: false })
class CTSearch {
  @Prop()
  parameters: any;

  @Prop({
    type: TrainSchema,
    default: () => ({ Train }),
  })
  train: Train;

  @Prop({
    type: PriceSchema,
    default: () => ({ Price }),
  })
  price: Price;
}

export const CTSearchSchema = SchemaFactory.createForClass(CTSearch);
export type CTSearchDocument = CTSearch & Document;
