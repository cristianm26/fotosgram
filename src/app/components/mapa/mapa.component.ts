import { Component, Input, OnInit, ViewChild } from '@angular/core';
declare let mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapa', { static: true  }) mapa;
  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3RpYW5tOTMiLCJhIjoiY2s1ZHcyNTdjMjE1MTNvbzR2OTRqbjVkaSJ9.vfRdnJbnmeQG8bhzmVGhwQ';
    const map = new mapboxgl.Map({
      container:this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], 
      zoom: 15
    });
    const marker= new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
  }

}
