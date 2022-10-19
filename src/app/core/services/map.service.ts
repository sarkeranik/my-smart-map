import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  SearchCountryByName(name: string | any): Observable<Country[]> {
    var response = this.http.get<any>(
      `https://api.maptiler.com/geocoding/${
        typeof name === 'string' ? name : name.Name
      }.json?key=CH1cYDfxBV9ZBu1lHGqh`
    );

    var countries: Country[] = [];
    response.subscribe((resp) => {
      for (const place of resp.features) {
        countries.push({
          Name: place.place_name,
          GeoCode: {
            Lng: place.center[0],
            Lat: place.center[1],
          },
        });
      }
      return of(countries);
    });
    return of([]);
  }
}
