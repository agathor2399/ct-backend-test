import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class Journey {
  /** puerto, estacion, cuidad, o pais de salida */
  @IsString()
  @IsNotEmpty()
  from: string;

  /** puerto, estacion, cuidad, o pais de llegada */
  @IsString()
  @IsNotEmpty()
  to: string;

  /** dia de salida del viaje */
  @IsString()
  @IsNotEmpty()
  date: string;
}

class Passenger {
  /** Numero de adultos */
  @IsInt()
  @Min(1)
  adults: number;

  /** Numero de niños */
  @IsInt()
  children: number;

  /** Total de pasajeros */
  @IsInt()
  total: number;
}

export class Search {
  /** listado de viajes */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true, message: 'Se han encontrado errores en la propiedad "journeys"' })
  @Type(() => Journey)
  journeys: Journey[];

  /** Pasageros del trayecto */
  @Type(() => Passenger)
  passenger: Passenger;

  /** Descuentos especiales, como juvilado */
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  bonus: string[];
}
