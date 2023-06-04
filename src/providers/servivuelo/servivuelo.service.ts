import { HttpService } from '@nestjs/axios';
import { IGetAccommodations, IGetPrices, IGetTimetables, IServivuelo } from './servivuelo-port';

export class ServivueloService implements IServivuelo {
  private readonly apiURL = `${global.env.baseUrl}/servivuelo`;
  constructor(private readonly httpService: HttpService) {}

  getTimetables(data: IGetTimetables) {
    return this.httpService.post(`${this.apiURL}/timetables`, data);
  }
  getPrices(data: IGetPrices) {
    return this.httpService.post(`${this.apiURL}/prices`, data);
  }
  getAccommodations(data: IGetAccommodations) {
    return this.httpService.post(`${this.apiURL}/accommodations`, data);
  }
}
