import { createAction, props, Action } from '@ngrx/store';
import { Country } from '../../models/country.model';
import { Pin } from '../../models/pin.model';
import { Marker } from 'maplibre-gl';

export const appLoaded = createAction('[App] App Loaded');

//#region Pins
export const loadAllPinsInitiate = createAction('[Home Page] Load All Pins ');
export const loadAllPinsSuccess = createAction(
  '[Home Page] Load All Pins Success',
  props<{ pins: Pin[] }>()
);
export const loadAllPinsFailed = createAction(
  '[Home Page] Load All Pins Failed',
  props<{ error: any }>()
);
export const removeAllPinsInitiate = createAction(
  '[Home Page] Remove All Pins Initiate'
);
//#endregion

//#region Country
export const fetchCountriesInitiate = createAction(
  '[Home Page] Fetch Countries Initiated',
  props<{ loc: String | object }>()
);

export const fetchCountriesSuccess = createAction(
  '[Home Page] Fetch Countries Success',
  props<{ countries: Country[] }>()
);
export const fetchCountriesFailed = createAction(
  '[Home Page] Fetch Countries Failed',
  props<{ error: any }>()
);

export const removeAllCountriesInitiate = createAction(
  '[Home Page] Remove All Countries Initiate'
);
//#endregion
