import { Country } from '../../models/country.model';
import { Pin } from '../../models/pin.model';

export interface MapState {
  countries: Country[];
  countriesLoading: boolean;
  pins: Pin[];
  pinLoading: boolean;
}

export const initialState: MapState = {
  countries: [],
  countriesLoading: false,
  pins: [],
  pinLoading: false,
};
