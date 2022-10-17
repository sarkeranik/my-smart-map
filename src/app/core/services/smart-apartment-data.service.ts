import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SmartApartmentDataService {
  constructor(private http: HttpClient) {}

  GetAllPins(): Observable<any> {
    var res = this.http.get<any>(
      `https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=7892483&token=88F93B7524A50EAE7F9682C08C2623FCD6AC1592&receipt=undefined`
    );
    return res;
  }
}
