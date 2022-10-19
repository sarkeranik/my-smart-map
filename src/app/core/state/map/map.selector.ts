import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './map.state';

export const selectMaps = createFeatureSelector<MapState>('maps');

export const selectCountries = createSelector(
  selectMaps,
  (state: MapState) => state.countries
);
export const selectPins = createSelector(
  selectMaps,
  (state: MapState) => state.pins
);
export const selectMarkers = createSelector(
  selectMaps,
  (state: MapState) => state.markers
);
