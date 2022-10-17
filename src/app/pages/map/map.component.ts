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
import { Observable, of } from 'rxjs';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map!: Map;
  markers: Marker[] = [];
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  markerTitle: string = '';
  geolocate!: GeolocateControl;

  countryInput: string = '';

  countrySuggestions: { Name: String; Latitude: [number, number] }[] = [];
  countrySuggestions$: Observable<
    { Name: String; Latitude: [number, number] }[]
  > = new Observable<{ Name: String; Latitude: [number, number] }[]>();
  countryLoading: boolean = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
    const key = 'SoL71Zyf7SmLrVYWC7fQ';
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh`,
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
    this.markers.push(marker);
    this.addMarkerOnClickActions(marker);

    //adding a new marker to the map on double click
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
    this.geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    // Add the control to the map.
    this.map.addControl(this.geolocate);
  }

  onLoadAllPinsClick() {
    console.log('onLoadAllPinsClick');
  }
  onRemovedAllPinsClick() {
    console.log('onRemovedAllPinsClick');
    //removing all the marker
    this.markers.forEach((marker) => marker.remove());
  }
  onAutoZoomToCenterAllPinsClick() {
    console.log('onAutoZoomToCenterAllPinsClick');
    if (this.markers.length > 1) {
      var bounds = new LngLatBounds();
      this.markers.forEach(function (feature) {
        bounds.extend(feature.getLngLat());
      });

      this.map.fitBounds(bounds, { maxZoom: 11 });
    } else {
      alert('Please add at least 2 markers');
    }
  }
  onMoveToYourLocationClick() {
    console.log('onMoveToYourLocationClick');
    //move to your location
    if (this.geolocate) {
      this.geolocate.trigger();
    }
  }
  onSearchCountryInput(con: string | any) {
    if (!con) {
      this.countryLoading = false;
      this.countrySuggestions = [];
      this.countrySuggestions$ = of(this.countrySuggestions);
      return;
    }
    this.countryLoading = true;
    this.countrySuggestions = [];
    this.mapService
      .SearchCountryByName(typeof con === 'string' ? con : con.Name)
      .subscribe((resp) => {
        for (const place of resp.features) {
          this.countrySuggestions.push({
            Name: place.place_name,
            Latitude: [place.center[0], place.center[1]],
          });
        }
        this.countrySuggestions$ = of(this.countrySuggestions);
        this.countryLoading = false;
      });
  }
  onSelectedCountry(con: any) {
    this.countryInput = con.Name;
    this.map.flyTo({
      center: { lng: con.Latitude[0], lat: con.Latitude[1] },
      duration: 2000,
      zoom: 10,
    });
    var marker = new Marker({ color: '#FF0000', draggable: true })
      .setLngLat({ lng: con.Latitude[0], lat: con.Latitude[1] })
      .addTo(this.map);
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
      popup.fire(e);
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
