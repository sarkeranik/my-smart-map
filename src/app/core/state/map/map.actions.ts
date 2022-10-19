import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/country.model';
import { Pin } from '../../models/pin.model';
import { Marker } from 'maplibre-gl';

export const appLoaded = createAction('[App] App Loaded');

//#region Pins
export const loadAllPinsOnLoadAllPinsButtonClicked = createAction(
  '[Home Page] Load All Pins On Load All Pins Button Clicked'
);
export const loadAllPinsOnLoadAllPinsButtonClickedSuccess = createAction(
  '[Home Page] Load All Pins On Load All Pins Button Clicked Success',
  props<{ pins: Pin[] }>()
);
export const loadAllPinsOnLoadAllPinsButtonClickedFailed = createAction(
  '[Menu API] Load All Pins On Load All Pins Button Clicked Failed',
  props<{ error: any }>()
);
//#endregion

//#region Country
export const fetchCountriesInitiate = createAction(
  '[Home Page] On Search Country Input Initiated',
  props<{ loc: String | any }>()
);

export const fetchCountriesSuccess = createAction(
  '[Home Page] Fetch Countries Success',
  props<{ countries: Country[] }>()
);
export const fetchCountriesFailed = createAction(
  '[Menu API] Fetch Countries Failed',
  props<{ error: any }>()
);

export const removeAllCountriesOnNewCountryInput = createAction(
  '[Home Page] Remove All Countries On New Country Input'
);

//#endregion

//#region Markers
export const addMarkerInitiated = createAction(
  '[Home Page] Add Marker Initiated',
  props<{ marker: Marker }>()
);

export const removeAllMarkerInitiated = createAction(
  '[Home Page] Remove All Marker Initiated'
);
//#endregion
