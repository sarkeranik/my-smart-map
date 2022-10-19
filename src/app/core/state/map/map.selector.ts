import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './map.state';

export const selectMaps = createFeatureSelector<MapState>('maps');

export const selectCountries = createSelector(
  selectMaps,
  (state: MapState) => state.countries
);
export const selectCountriesLoading = createSelector(
  selectMaps,
  (state: MapState) => state.countriesLoading
);
export const selectPins = createSelector(
  selectMaps,
  (state: MapState) => state.pins
);
export const selectPinLoading = createSelector(
  selectMaps,
  (state: MapState) => state.pinLoading
);
