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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  map!: Map;
  markers: Marker[] = [];
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() {}

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

    //move to your location
    // var geolocate = new GeolocateControl({
    //   positionOptions: {
    //     enableHighAccuracy: true,
    //   },
    //   trackUserLocation: true,
    // });
    // // Add the control to the map.
    // this.map.addControl(geolocate);
    // this.map.on('load', function () {
    //   geolocate.trigger();
    // });

    //adding a new marker to the map
    // new Marker({ color: '#FF0000', draggable: true })
    //   .setLngLat([initialState.lng, initialState.lat])
    //   .addTo(this.map);

    //adding a new marker to the map on double click
    // this.map.on('dblclick', (e) => {
    //   // console.log('A click event has occurred at ' + e.lngLat); // coordinates of the point on the map that was clicked. // The event object (e) contains information like the
    //   this.map.flyTo({
    //     center: e.lngLat,
    //     duration: 2000,
    //     zoom: 15,
    //   });
    //   var marker = new Marker({ color: '#FF0000', draggable: true })
    //     .setPopup(new Popup().setHTML('<h1>Clicked Location!</h1>'))
    //     .setLngLat(e.lngLat)
    //     .addTo(this.map);
    //   marker._lngLat;
    //   this.markers.push(marker);
    // });
    //Auto Zoom to center map on a group of pins.
    // setTimeout(() => {
    //   console.log('setTimeout');
    //   if (this.markers.length > 1) {
    //     var bounds = new LngLatBounds();
    //     this.markers.forEach(function (feature) {
    //       bounds.extend(feature.getLngLat());
    //     });

    //     this.map.fitBounds(bounds);
    //   }
    // }, 10000);

    //removing all the marker
    // this.map.on('dblclick', (e) => {
    //   console.log('dblclick');
    //   this.markers.forEach((marker) => marker.remove());
    // });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
