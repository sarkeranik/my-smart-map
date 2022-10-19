import { Action, createReducer, on } from '@ngrx/store';
import * as MapActions from './map.actions';
import { initialState, MapState } from './map.state';
import * as _ from 'lodash';

const mapsReducer = createReducer(
  initialState,
  on(MapActions.loadAllPinsOnLoadAllPinsButtonClicked, (state) => ({
    ...state,
  })),
  on(
    MapActions.loadAllPinsOnLoadAllPinsButtonClickedSuccess,
    (state, { pins }) => {
      let listClone = _.cloneDeep(pins); // for immutability
      return { ...state, pins: listClone };
    }
  ),
  on(MapActions.fetchCountriesSuccess, (state, { countries }) => {
    let listClone = _.cloneDeep(countries); // for immutability
    return { ...state, countries: listClone };
  }),

  on(MapActions.addMarkerInitiated, (state, { marker }) => {
    state.markers.push(marker);
    return { ...state, markers: state.markers }; // remove state.markers
  }),
  on(MapActions.removeAllMarkerInitiated, (state, {}) => {
    state.markers = [];
    return { ...state, markers: state.markers }; // remove state.markers
  }),
  on(MapActions.removeAllCountriesOnNewCountryInput, (state, {}) => {
    state.countries = [];
    return { ...state, countries: state.countries }; // remove state.countries
  }),
  on(MapActions.fetchCountriesInitiate, (state, { loc }) => {
    return { ...state }; // remove state.markers
  })
);

export function reducer(state: MapState | undefined, action: Action) {
  return mapsReducer(state, action);
}
