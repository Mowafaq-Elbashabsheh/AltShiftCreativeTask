import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Emitters } from '../emitters/emitters';
import MarkerClusterer from '@googlemaps/markerclustererplus';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapDiv:any;
  authenticated = false;
  message = "";
  map:any;
  locations = [
    {lat: 31.963158, lng:35.930359},
    {lat: 31.863158, lng:35.830359},
    {lat: 31.763158, lng:35.830359},
    {lat: 31.863158, lng:35.730359},
    {lat: 31.863158, lng:35.630359}
  ];


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.mapDiv = document.getElementById("map");
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    this.http.get('http://localhost:8000/api/user', {withCredentials: true})
      .subscribe(
        (res: any) => {
          Emitters.authEmitter.emit(true);

          let loader= new Loader({
            apiKey:'AIzaSyD0GWhLtQyZU8W2u22f8H-e7Bod1SXBUtA'
          });
          
          loader.load().then(() => {
            this.map = new google.maps.Map(this.mapDiv, {
              center:{lat: 31.963158, lng:35.930359},
              zoom:10,
              //isFractionalZoomEnabled: true,
              //mapId:'29d9e634fe001233'
            });

            const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            
            const markers = this.locations.map((location, i) => {
              return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
              });
            });
            new MarkerClusterer(this.map, markers, {
              imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
            });
/*
            for(var i=0;i<this.markers.length;i++)
            {
              new google.maps.Marker({
                position: this.markers[i],
                map:this.map
              })
            }


            
            new google.maps.Marker({
              position:{lat: 31.963158, lng:35.930359},
              map:this.map
            });
            new google.maps.Marker({
              position:{lat: 31.863158, lng:35.830359},
              map:this.map
            });
            new google.maps.Marker({
              position:{lat: 31.763158, lng:35.830359},
              map:this.map
            });
            new google.maps.Marker({
              position:{lat: 31.863158, lng:35.730359},
              map:this.map
            });
            new google.maps.Marker({
              position:{lat: 31.863158, lng:35.630359},
              map:this.map
            });
      */
          });
        },
        err => {
          Emitters.authEmitter.emit(false);
          this.message = 'You are not logged in';
        }
    );
  }
}
