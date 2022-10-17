import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  SearchCountryByName(name: string): Observable<any> {
    var res = this.http.get<any>(
      `https://api.maptiler.com/geocoding/${name}.json?key=CH1cYDfxBV9ZBu1lHGqh`
    );
    return res;
  }
}
