export interface IGetAccommodations {
  shipID: number;
  departureDate: string;
}

export interface IGetPrices {
  shipID: number;
  departureDate: string;
  accommodation: string;
}

export interface IGetTimetables {
  adults: number;
  childrens: number;
  from: string;
  to: string;
  date: string;
}

export interface IServivuelo {
  getTimetables(data: IGetTimetables): any;
  getPrices(data: IGetPrices): any;
  getAccommodations(data: IGetAccommodations): any;
}
