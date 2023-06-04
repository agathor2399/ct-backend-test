import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';

class Departure {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  station: string;
}

class Arrival extends Departure {}

class Duration {
  @IsInt()
  hours: number;

  @IsInt()
  minutes: number;
}

class Journey {
  @Type(() => Departure)
  departure: Departure;

  @Type(() => Arrival)
  arrival: Arrival;

  @Type(() => Duration)
  duration: Duration;
}

class Passenger {
  @IsNumberString()
  adults: string;

  @IsNumberString()
  children: string;
}

class Accommodation {
  @IsString()
  @IsNotEmpty()
  type: string;

  @Type(() => Passenger)
  passengers: Passenger;
}

class Train {
  @IsEnum({ oneway: 'oneway', roundtrip: 'roundtrip', multidestination: 'multidestination' })
  type: 'oneway' | 'roundtrip' | 'multidestination';

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true, message: 'Se han encontrado errores en la propiedad "journeys"' })
  @Type(() => Journey)
  journeys: Journey[];

  @Type(() => Accommodation)
  accommodations: Accommodation;
}

class Breakdown {
  @IsNumber()
  adult: number;

  @IsNumber()
  children: number;
}

class Price {
  @IsNumber()
  total: number;

  @Type(() => Breakdown)
  breakdown: Breakdown;
}

export class SaveCTSearch {
  @IsNotEmpty()
  parameters: any;

  @Type(() => Train)
  train: Train;

  @Type(() => Price)
  price: Price;
}
