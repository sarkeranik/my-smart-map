import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MAPTILER_API_DOMAIN,
  MAPTILER_API_KEY,
} from '../../_infrastructure/appSettings';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  SearchCountryByName(name: string | any): Observable<any> {
    var response = this.http.get<any>(
      `${MAPTILER_API_DOMAIN}/geocoding/${
        typeof name === 'string' ? name : name.Name
      }.json?key=${MAPTILER_API_KEY}`
    );
    return response;
  }
}
