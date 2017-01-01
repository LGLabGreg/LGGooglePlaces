import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';

const googleApiUrl = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyBLMi5CSM7M-4vIz-Mp9Yh0l7DrD5vDADo&callback=onGoogleApiLoaded&libraries=places';
 
@Injectable()
export class GoogleService {

  private map: any;
  private google: any;
  private mapInfoWindow: any;

  private static promise;
 
  constructor(private http: Http) {
  }

  buildUrl(params: any){
    params.key = environment.googlePlacesAPIKey;
    let base = environment.googlePlacesBaseUrl;
    let str = [];
    for(let p in params) {
      if (params.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
      }
    }
    return base + str.join('&');
  }

  getPlaces(params: any): Observable<any>{
    
    return Observable.create(observer => {

      this.loadApi().then(google => {
        this.google = google;
        this.map = new this.google.maps.Map(document.getElementById('map'), {
          center: params.location,
          zoom: 15
        });
        this.mapInfoWindow = new google.maps.InfoWindow();
        
        let service = new this.google.maps.places.PlacesService(this.map);
        service.nearbySearch(params, (results, status, pagination) => {
          observer.next(results);
          observer.complete();

          console.log(results.length)

          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              this.createMarker(results[i]);
            }
          }

        });
      })

      //observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
    })
  }

  createMarker(place) {
    console.log('createMarker')
    var placeLoc = place.geometry.location;
    var marker = new this.google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
    //bounds.extend(marker.getPosition());
    //map.fitBounds(bounds);
    let self = this;
    this.google.maps.event.addListener(marker, 'click', function() {
      self.mapInfoWindow.setContent(place.name);
      self.mapInfoWindow.open(self.map, this);
    });

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

  public loadApi() {
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

  /*
  post(url: string, data: Object){
    return this.http.post(url, data).map((res:Response) => res.json());
  }
  */
 
}

