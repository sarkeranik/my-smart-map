import { Action, createReducer, on } from '@ngrx/store';
import * as MapActions from './map.actions';
import { initialState, MapState } from './map.state';
import * as _ from 'lodash';

export const reducer = createReducer(
  initialState,
  on(MapActions.loadAllPinsInitiate, (state, {}) => {
    console.log('reducer called');
    return { ...state, pinLoading: true };
  }),
  on(MapActions.loadAllPinsSuccess, (state, { pins }) => {
    let listClone = _.cloneDeep(pins); // for immutability
    return { ...state, pins: listClone, pinLoading: false };
  }),
  on(MapActions.loadAllPinsFailed, (state, {}) => {
    return { ...state, pinLoading: false };
  }),

  on(MapActions.removeAllPinsInitiate, (state, {}) => {
    return { ...state, pins: [] };
  }),
  on(MapActions.removeAllCountriesInitiate, (state, {}) => {
    return { ...state, countries: [] };
  }),

  on(MapActions.fetchCountriesInitiate, (state, { loc }) => {
    return { ...state, countriesLoading: true };
  }),
  on(MapActions.fetchCountriesSuccess, (state, { countries }) => {
    let listClone = _.cloneDeep(countries);
    return { ...state, countries: listClone, countriesLoading: false };
  })
);
