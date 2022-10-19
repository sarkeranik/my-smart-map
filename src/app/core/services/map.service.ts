import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  SearchCountryByName(name: string | any): Observable<any> {
    console.log('SearchCountryByName', name);
    var response = this.http.get<any>(
      `https://api.maptiler.com/geocoding/${
        typeof name === 'string' ? name : name.Name
      }.json?key=CH1cYDfxBV9ZBu1lHGqh`
    );
    return response;
  }
}
