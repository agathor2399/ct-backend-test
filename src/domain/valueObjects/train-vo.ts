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
    type: string;
    /** Pasajeros que van en esta acomodacion */
    passengers: {
      adults: string;
      children: string;
    };
  };
}

export type InputTrain = {
  /** Tipo de viaje, oneway si solo tiene un journey,
   * multidestination si tiene mas de 1,
   * y roundtrip si tiene 2 journey y vuelve al mismo sitio desde el que salió  */
  type: 'oneway' | 'roundtrip' | 'multidestination';
  /** Array con cada uno de los viajes, recordemos que si es roundtrip seran 2 */
  journeys: {
    /** Información de salida */
    departure: {
      /** Fecha en formato DD/MM/YYYY */
      date: Date | string | number;
      /** Hora en formato HH:mm */
      time: string;
      /** Codigo de la estacion (nuestros codigos, no los de proveedor) */
      station: string;
    };
    /** Información de llegada */
    arrival: {
      /** Fecha en formato DD/MM/YYYY */
      date: Date | string | number;
      /** Hora en formato HH:mm */
      time: string;
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
    type: string;
    /** Pasajeros que van en esta acomodacion */
    passengers: {
      adults: string;
      children: string;
    };
  };
};

export class Train extends ValueObject<ITrain> {
  get value(): InputTrain {
    return {
      ...this.props,
      journeys: this.props.journeys.map(journey => {
        return {
          ...journey,
          departure: {
            ...journey.departure,
            date: journey.departure.date.value,
            time: journey.departure.time.value,
          },
          arrival: {
            ...journey.arrival,
            date: journey.arrival.date.value,
            time: journey.arrival.time.value,
          },
        };
      }),
    };
  }

  constructor(value: InputTrain) {
    const { type, journeys, accommodations } = value;
    super({
      type,
      journeys: journeys.map(journey => {
        return {
          ...journey,
          departure: {
            ...journey.departure,
            date: new DateVO(journey.departure.date),
            time: new Time(journey.departure.time),
          },
          arrival: {
            ...journey.arrival,
            date: new DateVO(journey.arrival.date),
            time: new Time(journey.departure.time),
          },
        };
      }),
      accommodations,
    });
    this.validate();
  }

  protected validate(): void {
    if (
      !(
        this.props.type === 'oneway' ||
        this.props.type === 'roundtrip' ||
        this.props.type === 'multidestination'
      )
    ) {
      throw new Error(`Invalid "Type" value: ${this.props.type}`);
    }

    for (const journey of this.props.journeys) {
      if (!Number.isInteger(journey.duration.hours)) {
        throw new Error(`Invalid "Hour" value: ${journey.duration.hours}`);
      }
      if (!Number.isInteger(journey.duration.minutes)) {
        throw new Error(`Invalid "Minutes" value: ${journey.duration.minutes}`);
      }
    }

    if (
      !(
        this.props.accommodations.type === 'Estandar' ||
        this.props.accommodations.type === 'Confort' ||
        this.props.accommodations.type === 'Premium'
      )
    ) {
      throw new Error(`Invalid "Accommodation Type" value: ${this.props.accommodations.type}`);
    }
  }
}
