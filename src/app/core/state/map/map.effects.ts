import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap, Subject } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  exhaustMap,
  mergeMap,
  concatMap,
  mergeAll,
} from 'rxjs/operators';
import { MapService } from '../../../core/services/map.service';
import { SmartApartmentDataService } from '../../../core/services/smart-apartment-data.service';
import * as MapActions from '../../state/map/map.actions';
import { cloneDeep } from 'lodash';
// import { Pin } from '../models/Pin.model';
import { Pin } from '../../models/pin.model';
import { Country } from '../../models/country.model';

@Injectable()
export class MapsEffects {
  constructor(
    private actions$: Actions<any>,
    private mapService: MapService,
    private smartApartmentDataService: SmartApartmentDataService
  ) {}
  destroy$: Subject<boolean> = new Subject<boolean>();

  loadAllPinsOnLoadAllPinsButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      // you can pass in multiple actions here that will trigger the same effect
      ofType(MapActions.loadAllPinsInitiate),
      switchMap(() => {
        console.log('effect called');
        var res = this.smartApartmentDataService.GetAllPins().pipe(
          map((resp) => {
            var pins: Pin[] = [];
            pins = cloneDeep([]);
            if (!resp || !resp.records) {
              return MapActions.loadAllPinsSuccess({
                pins: pins,
              });
            }

            for (const item of resp.records) {
              pins.push({
                Name: item.name,
                PhotoUrl: item.photo,
                GeoCode: {
                  Lng: item.geocode.Longitude,
                  Lat: item.geocode.Latitude,
                },
              });
            }
            return MapActions.loadAllPinsSuccess({
              pins: pins,
            });
          }),
          catchError((error) =>
            of(
              MapActions.loadAllPinsFailed({
                error: error,
              })
            )
          )
        );
        return res;
      })
    )
  );
  fetchCountriesOnLocInput$ = createEffect(() =>
    this.actions$.pipe(
      // you can pass in multiple actions here that will trigger the same effect
      ofType(MapActions.fetchCountriesInitiate),
      switchMap((args) =>
        this.mapService.SearchCountryByName(args.loc).pipe(
          map((resp) => {
            console.log('this.mapService.SearchCountryByName', resp);
            var countries: Country[] = [];

            for (const place of resp.features) {
              countries.push({
                Name: place.place_name,
                GeoCode: {
                  Lng: place.center[0],
                  Lat: place.center[1],
                },
              });
            }
            return MapActions.fetchCountriesSuccess({ countries: countries });
          }),
          catchError((error) =>
            of(MapActions.fetchCountriesFailed({ error: error }))
          )
        )
      )
    )
  );
  //for debugging the ngrx states
  init$ = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false }
  );
}
