import { Action, createReducer, on } from '@ngrx/store';
import * as MapActions from './map.actions';
import { initialState, MapState } from './map.state';
import * as _ from 'lodash';

export const reducer = createReducer(
  initialState,
  on(MapActions.loadAllPinsOnLoadAllPinsButtonClicked, (state, {}) => {
    console.log('reducer called');
    return { ...state, pinLoading: true };
  }),
  on(
    MapActions.loadAllPinsOnLoadAllPinsButtonClickedSuccess,
    (state, { pins }) => {
      let listClone = _.cloneDeep(pins); // for immutability
      return { ...state, pins: listClone, pinLoading: false };
    }
  ),
  on(MapActions.loadAllPinsOnLoadAllPinsButtonClickedFailed, (state, {}) => {
    return { ...state, pinLoading: false };
  }),

  on(MapActions.removeAllPinsInitiate, (state, {}) => {
    // state.pins = [];
    return { ...state, pins: [] }; // remove state.markers
  }),
  on(MapActions.removeAllCountriesOnNewCountryInput, (state, {}) => {
    return { ...state, countries: [] }; // remove state.countries
  }),

  on(MapActions.fetchCountriesInitiate, (state, { loc }) => {
    return { ...state, countriesLoading: true }; // remove state.markers
  }),
  on(MapActions.fetchCountriesSuccess, (state, { countries }) => {
    let listClone = _.cloneDeep(countries); // for immutability
    return { ...state, countries: listClone, countriesLoading: false };
  })
);

// export function reducer(state: MapState | undefined, action: Action) {
//   return mapsReducer(state, action);
// }
