import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SMART_APARTMENT_DATE_APARTMENT_LIST_API } from '../../_infrastructure/appSettings';
@Injectable({
  providedIn: 'root',
})
export class SmartApartmentDataService {
  constructor(private http: HttpClient) {}

  GetAllPins(): Observable<any> {
    var response = this.http.get<any>(SMART_APARTMENT_DATE_APARTMENT_LIST_API);
    return response;
  }
}
