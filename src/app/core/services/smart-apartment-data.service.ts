import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pin } from '../models/pin.model';
import { cloneDeep } from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class SmartApartmentDataService {
  constructor(private http: HttpClient) {}

  GetAllPins(): Observable<any> {
    var response = this.http.get<any>(
      `https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=7892483&token=88F93B7524A50EAE7F9682C08C2623FCD6AC1592&receipt=undefined`
    );
    return response;
  }
}
