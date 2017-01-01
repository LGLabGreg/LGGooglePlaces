import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { GeolocationService } from '../services/geolocation.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';

const googleApiUrl = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyBLMi5CSM7M-4vIz-Mp9Yh0l7DrD5vDADo&callback=onGoogleApiLoaded&libraries=places';
 
@Injectable()
export class GoogleService {

  private api: any;
  private service: any;
  private map: any;
  private mapInfoWindow: any;

  private static promise;
 
  constructor(
    private geolocationService: GeolocationService
  ) {
    this.init();
  }

  init() {
    this.getApi().then(api => {
      this.api = api;
    });
  }

  setUp() {
    this.createMap();
    this.createService();
  }

  isReady(): boolean {
    return this.map && this.service;
  }

  createMap() {
    this.map = new this.api.maps.Map(document.getElementById('map'), {
      center: this.geolocationService.currentLocation(),
      zoom: 15
    });
    this.mapInfoWindow = new this.api.maps.InfoWindow();

  }

  createService() {
    this.service = new this.api.maps.places.PlacesService(this.map);
  }

  getPlaces(params: any): Observable<any>{
    
    return Observable.create(observer => {

      if(!this.isReady()){
        this.setUp();
      }

      this.service.nearbySearch(params, (results, status, pagination) => {

        observer.next(results);
        observer.complete();

        if (status === this.api.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            //this.createMarker(results[i]);
          }
        }

      });

      //observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
    })
  }

  public createMarker(place) {
    let marker = new this.api.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
    //bounds.extend(marker.getPosition());
    //map.fitBounds(bounds);
    let self = this;
    this.api.maps.event.addListener(marker, 'click', function() {
      self.mapInfoWindow.setContent(place.name);
      self.mapInfoWindow.open(self.map, this);
    });

  }

  public createCurrentPositionMarker() {
    if(!this.isReady()){
      this.setUp();
    }
    let marker = new this.api.maps.Marker({
      icon: 'http://watnow.io/assets/images/marker.png',
      map: this.map,
      position: this.geolocationService.currentLocation()
    });
    //bounds.extend(marker.getPosition());
    //map.fitBounds(bounds);
    let self = this;
    this.api.maps.event.addListener(marker, 'click', function() {
      self.mapInfoWindow.setContent('You are here!');
      self.mapInfoWindow.open(self.map, this);
    });

  }


  public getApi() {
    // First time 'load' is called?
    if (!GoogleService.promise) {

        // Make promise to load
        GoogleService.promise = new Promise( resolve => {

            // Set callback for when google maps is loaded.
            window['onGoogleApiLoaded'] = (ev) => {
              //console.log('onGoogleApiLoaded: ' + JSON.stringify(window['google']))
              resolve(window['google']);
            };

            let node = document.createElement('script');
            node.src = googleApiUrl;
            node.type = 'text/javascript';
            document.getElementsByTagName('head')[0].appendChild(node);
        });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return GoogleService.promise;
  }

  private handleError (error: Response | any) {
    console.error('handleError: ' + JSON.stringify(error));
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //TODO: optimize error handling
    errMsg = environment.errorMessages.generic;
    return Observable.throw(errMsg);
  }
 
}

