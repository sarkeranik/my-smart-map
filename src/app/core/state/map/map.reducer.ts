import { Action, createReducer, on } from '@ngrx/store';
import * as MapActions from './map.actions';
import { initialState, MapState } from './map.state';
import * as _ from 'lodash';

export const reducer = createReducer(
  initialState,
  on(MapActions.loadAllPinsOnLoadAllPinsButtonClicked, (state, {}) => {
    console.log('reducer called');
    return { ...state };
  }),
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

  on(MapActions.removeAllPinsInitiate, (state, {}) => {
    // state.pins = [];
    return { ...state, pins: [] }; // remove state.markers
  }),
  on(MapActions.removeAllCountriesOnNewCountryInput, (state, {}) => {
    return { ...state, countries: [] }; // remove state.countries
  }),
  on(MapActions.fetchCountriesInitiate, (state, { loc }) => {
    return { ...state }; // remove state.markers
  })
);

// export function reducer(state: MapState | undefined, action: Action) {
//   return mapsReducer(state, action);
// }
