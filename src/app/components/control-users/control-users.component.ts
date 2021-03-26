import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-control-users',
  templateUrl: './control-users.component.html',
  styleUrls: ['./control-users.component.scss']
})

export class ControlUsersComponent implements OnInit {
  title = 'locationApp';
  
  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
   
    const cordenadaLat=51.505;//Aqui se recogueria la latitud del trabajador o el aparato central por la base de datos
    const cordenadaLon=-0.09;//Aqui se recogueria la longitud del trabajador por la base de datos
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      console.log(position.coords.latitude, position.coords.longitude)
      var mymap = L.map('mapid').setView([41.3461764, 2.1683645], 13);
      //var mymap = L.map('mapid').setView([cordenadaLat, cordenadaLon], 13);//Aqui seria para poner el mapa en la zona especificada
      //var marker = L.marker([cordenadaLat, cordenadaLon]).addTo(mymap);//Aqui seria el marcador de un trabajador para ver su localizacion

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib3NjYXJ1YmVkYSIsImEiOiJja2syYzk3ejIwenpiMm50N3MzM3Zod216In0.dG9NSMCOWGgxQqLuCKqhlg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

  }
    )}
}