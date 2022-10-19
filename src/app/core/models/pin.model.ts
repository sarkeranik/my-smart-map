import { GeoCode } from './geo-code.model';

export class Pin {
  Name: String = '';
  PhotoUrl: String = '';
  GeoCode: GeoCode = new GeoCode();
}
