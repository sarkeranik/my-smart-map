import { Country } from '../../models/country.model';
import { Pin } from '../../models/pin.model';
import { Marker } from 'maplibre-gl';

export interface MapState {
  countries: Country[];
  pins: Pin[];
  markers: Marker[];
}

export const initialState: MapState = {
  countries: [],
  pins: [],
  markers: [],
};
