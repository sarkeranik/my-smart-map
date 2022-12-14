import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  Map,
  NavigationControl,
  Marker,
  GeolocateControl,
  Popup,
  LngLatBounds,
} from 'maplibre-gl';
import { Observable, of, takeUntil, Subject, map } from 'rxjs';
import { MapService } from '../../../../core/services/map.service';
import { SmartApartmentDataService } from '../../../../core/services/smart-apartment-data.service';
import { Store } from '@ngrx/store';
import {
  appLoaded,
  loadAllPinsInitiate,
  fetchCountriesInitiate,
  removeAllCountriesInitiate,
  selectCountries,
  selectCountriesLoading,
  selectPins,
  selectPinLoading,
  removeAllPinsInitiate,
  MapState,
} from '../../../../core/state/map';
import { Pin } from 'src/app/core/models/pin.model';
import { Country } from 'src/app/core/models/country.model';
import {
  MAPTILER_API_KEY,
  MAPTILER_STYLE_API,
  MAPTILER_API_DOMAIN,
} from '../../../../_infrastructure/appSettings';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map!: Map;
  markers: Marker[] = [];
  markerTitle: String = '';
  geoLocate!: GeolocateControl;

  countryInput: String = '';

  public countrySuggestions$: Observable<Country[]> = new Observable<
    Country[]
  >();
  countryLoading$: Observable<boolean> = new Observable<boolean>();

  public pins$: Observable<Pin[]> = new Observable<Pin[]>();
  pinsLoading$: Observable<boolean> = new Observable<boolean>();

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  constructor(private store: Store<MapState>) {
    this.countrySuggestions$ = this.store.select(selectCountries);
    this.countryLoading$ = this.store.select(selectCountriesLoading);
    this.pins$ = this.store.select(selectPins);
    this.pinsLoading$ = this.store.select(selectPinLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(appLoaded());
  }

  ngAfterViewInit() {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `${MAPTILER_API_DOMAIN}${MAPTILER_STYLE_API}?key=${MAPTILER_API_KEY}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      doubleClickZoom: false,
    });
    this.map.addControl(
      new NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      }),
      'top-right'
    );
    //adding a new marker to the map
    var marker = new Marker({ color: '#FF0000', draggable: true })
      .setLngLat([initialState.lng, initialState.lat])
      .addTo(this.map);

    this.addMarkerOnClickActions(marker);

    this.markers.push(marker);

    // adding a new marker to the map on double click
    this.map.on('dblclick', (e) => {
      this.map.flyTo({
        center: e.lngLat,
        duration: 2000,
        zoom: 15,
      });
      var marker = new Marker({ color: '#FF0000', draggable: true })
        .setLngLat(e.lngLat)
        .addTo(this.map);

      if (this.markerTitle) {
        marker.setPopup(new Popup().setHTML(`<h1>${this.markerTitle}</h1>`));
      }

      this.addMarkerOnClickActions(marker);

      marker.getElement().addEventListener('oncontextmenu', (e) => {
        marker.remove();
      });

      this.markers.push(marker);
    });

    //adding users location
    this.geoLocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    // Add the control to the map.
    this.map.addControl(this.geoLocate);
    this.map.resize();
  }

  onLoadAllPinsClick() {
    this.store.dispatch(loadAllPinsInitiate());
    this.pins$.subscribe((pins) => {
      var pinnedMarkers: Marker[] = [];
      if (pins && pins.length > 0) {
        pins.forEach((pin) => {
          //adding marker to all the pins
          var marker = new Marker({ color: '#FF0000' })
            .setLngLat({ lon: pin.GeoCode.Lng, lat: pin.GeoCode.Lat })
            .addTo(this.map);
          this.addMarkerOnClickActions(marker);
          this.markers.push(marker);

          pinnedMarkers.push(marker);
        });
      }

      //zoom out to see all pins
      if (pinnedMarkers.length > 0) {
        var bounds = new LngLatBounds();
        pinnedMarkers.forEach(function (marker) {
          bounds.extend(marker.getLngLat());
        });
        this.map.fitBounds(bounds, { maxZoom: 11 });
      }
    });
  }
  onRemoveAllMarkersClick() {
    //removing all the marker
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
    this.store.dispatch(removeAllPinsInitiate());
  }
  onAutoZoomToCenterAllMarkersClick() {
    if (this.markers.length > 1) {
      var bounds = new LngLatBounds();
      this.markers.forEach(function (marker) {
        bounds.extend(marker.getLngLat());
      });

      this.map.fitBounds(bounds, { maxZoom: 11 });
    } else {
      alert('Please add at least 2 markers');
    }
  }
  onMoveToYourLocationClick() {
    //move to your location
    if (this.geoLocate) {
      this.geoLocate.trigger();
    }
  }
  onSearchCountryInput($eventArgs: any) {
    let name: String | object = $eventArgs;

    if (!name) {
      this.store.dispatch(removeAllCountriesInitiate());
      return;
    }
    this.store.dispatch(fetchCountriesInitiate({ loc: name }));
  }
  onSelectedCountry($eventArgs: any) {
    var con: Country = $eventArgs;
    this.countryInput = con.Name;
    this.map.flyTo({
      center: { lng: con.GeoCode.Lng, lat: con.GeoCode.Lat },
      duration: 2000,
      zoom: 10,
    });

    var marker = new Marker({ color: '#FF0000' })
      .setLngLat({ lng: con.GeoCode.Lng, lat: con.GeoCode.Lat })
      .addTo(this.map);
    this.addMarkerOnClickActions(marker);

    this.markers.push(marker);
  }
  addMarkerOnClickActions(marker: Marker) {
    if (!marker) {
      return;
    }
    marker.getElement().addEventListener('click', (e) => {
      this.map.flyTo({
        center: { lng: marker._lngLat.lng, lat: marker._lngLat.lat },
        duration: 2000,
        zoom: 15,
      });
      var popup = marker.getPopup();
      if (popup) {
        popup.fire(e);
      }
    });
  }

  onSelectedApartmentItem($eventArgs: any) {
    let item: Pin = $eventArgs;

    this.map.flyTo({
      center: { lng: item.GeoCode.Lng, lat: item.GeoCode.Lat },
      duration: 2000,
      zoom: 15,
    });
  }

  onMarkerTitleChange($eventArgs: any) {
    let markerTitle: String = $eventArgs;

    this.markerTitle = markerTitle;
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
