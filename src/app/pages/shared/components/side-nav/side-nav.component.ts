import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from 'src/app/core/models/country.model';
import { Pin } from 'src/app/core/models/pin.model';
import {
  MapState,
  selectCountries,
  selectCountriesLoading,
  selectPinLoading,
  selectPins,
} from 'src/app/core/state/map';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  // countryInput!: String;
  markerTitle!: String;

  public countrySuggestions$: Observable<Country[]> = new Observable<
    Country[]
  >();
  countryLoading$: Observable<boolean> = new Observable<boolean>();

  public pins$: Observable<Pin[]> = new Observable<Pin[]>();
  pinsLoading$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store<MapState>) {
    this.countrySuggestions$ = this.store.select(selectCountries);
    this.countryLoading$ = this.store.select(selectCountriesLoading);
    this.pins$ = this.store.select(selectPins);
    this.pinsLoading$ = this.store.select(selectPinLoading);
  }

  ngOnInit(): void {}
  @Input() countryInput!: String;
  @Output() onRemoveAllMarkersClick = new EventEmitter();
  @Output() onAutoZoomToCenterAllMarkersClick = new EventEmitter();
  @Output() onMoveToYourLocationClick = new EventEmitter();

  @Output() onSearchCountryInput = new EventEmitter<String | Object>();
  @Output() onSelectedCountry = new EventEmitter<Country>();
  @Output() onLoadAllPinsClick = new EventEmitter();
  @Output() onSelectedApartmentItem = new EventEmitter<Pin>();

  @Output() onMarkerTitleChanged = new EventEmitter<String>();

  onRemoveAllMarkersClicked() {
    this.onRemoveAllMarkersClick.emit();
  }
  onAutoZoomToCenterAllMarkersClicked() {
    this.onAutoZoomToCenterAllMarkersClick.emit();
  }
  onMoveToYourLocationClicked() {
    this.onMoveToYourLocationClick.emit();
  }

  onSearchCountryInputed(name: String | object) {
    this.onSearchCountryInput.emit(name);
  }
  onSelectCountry(con: Country) {
    this.onSelectedCountry.emit(con);
  }
  onLoadAllPinsClicked() {
    this.onLoadAllPinsClick.emit();
  }
  onSelectApartmentItem(pin: Pin) {
    this.onSelectedApartmentItem.emit(pin);
  }
  onMarkerTitleChange() {
    this.onMarkerTitleChanged.emit(this.markerTitle);
  }
}
