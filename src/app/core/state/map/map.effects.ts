import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { MapService } from '../../../core/services/map.service';
import { SmartApartmentDataService } from '../../../core/services/smart-apartment-data.service';
import * as MapActions from '../../state/map/map.actions';

@Injectable()
export class MapsEffects {
  constructor(
    private actions$: Actions<any>,
    private mapService: MapService,
    private smartApartmentDataService: SmartApartmentDataService
  ) {}

  loadAllPinsOnLoadAllPinsButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      // you can pass in multiple actions here that will trigger the same effect
      ofType(MapActions.loadAllPinsOnLoadAllPinsButtonClicked),
      switchMap(() =>
        this.smartApartmentDataService.GetAllPins().pipe(
          map((pins) =>
            MapActions.loadAllPinsOnLoadAllPinsButtonClickedSuccess({
              pins: pins,
            })
          ),
          catchError((error) =>
            of(
              MapActions.loadAllPinsOnLoadAllPinsButtonClickedFailed({
                error: error,
              })
            )
          )
        )
      )
    )
  );

  fetchCountriesOnLocInput$ = createEffect(() =>
    this.actions$.pipe(
      // you can pass in multiple actions here that will trigger the same effect
      ofType(MapActions.fetchCountriesInitiate),
      switchMap((args) =>
        this.mapService.SearchCountryByName(args.loc).pipe(
          map((countries) =>
            MapActions.fetchCountriesSuccess({ countries: countries })
          ),
          catchError((error) =>
            of(MapActions.fetchCountriesFailed({ error: error }))
          )
        )
      )
    )
  );
  init$ = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false }
  );
}
