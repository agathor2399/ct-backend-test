import { ValueObject } from '@/common/valueObject.base';
import { DateVO } from '@/common/valueObjects/date-vo';
import { Time } from '@/common/valueObjects/time-vo';

interface ITrain {
  /** Tipo de viaje, oneway si solo tiene un journey,
   * multidestination si tiene mas de 1,
   * y roundtrip si tiene 2 journey y vuelve al mismo sitio desde el que salió  */
  type: 'oneway' | 'roundtrip' | 'multidestination';
  /** Array con cada uno de los viajes, recordemos que si es roundtrip seran 2 */
  journeys: {
    /** Información de salida */
    departure: {
      /** Fecha en formato DD/MM/YYYY */
      date: DateVO;
      /** Hora en formato HH:mm */
      time: Time;
      /** Codigo de la estacion (nuestros codigos, no los de proveedor) */
      station: string;
    };
    /** Información de llegada */
    arrival: {
      /** Fecha en formato DD/MM/YYYY */
      date: DateVO;
      /** Hora en formato HH:mm */
      time: Time;
      /** Codigo de la estacion (nuestros codigos, no los de proveedor) */
      station: string;
    };
    /** Duracion del viaje */
    duration: {
      hours: number;
      minutes: number;
    };
  }[];
  accommodations: {
    /** Codigo de la acomodacion ej: Estandar, Confort, Premiun, ... */
    type: 'Estandar' | 'Confort' | 'Premium';
    /** Pasajeros que van en esta acomodacion */
    passengers: {
      adults: string;
      children: string;
    };
  };
}

export class Train extends ValueObject<ITrain> {
  get type() {
    return this.props.type;
  }
  get journeys() {
    return this.props.journeys;
  }
  get accommodations() {
    return this.props.accommodations;
  }

  protected validate(props: ITrain): void {
    if (
      !(props.type === 'oneway' || props.type === 'roundtrip' || props.type === 'multidestination')
    ) {
      throw new Error(`Invalid "Type" value: ${props.type}`);
    }

    for (const journey of props.journeys) {
      if (!Number.isInteger(journey.duration.hours)) {
        throw new Error(`Invalid "Hour" value: ${journey.duration.hours}`);
      }
      if (!Number.isInteger(journey.duration.minutes)) {
        throw new Error(`Invalid "Minutes" value: ${journey.duration.minutes}`);
      }
    }

    if (
      !(
        props.accommodations.type === 'Estandar' ||
        props.accommodations.type === 'Confort' ||
        props.accommodations.type === 'Premium'
      )
    ) {
      throw new Error(`Invalid "Accommodation Type" value: ${props.accommodations.type}`);
    }
  }
}
