import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
 
@Injectable()
export class GoogleService {
 
  constructor(private http: Http) { }

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

  getPlaces(url: string){
    return this.http.get(url)
      .map((res:Response) => res.json())
      .catch(this.handleError);
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

  /*
  post(url: string, data: Object){
    return this.http.post(url, data).map((res:Response) => res.json());
  }
  */
 
}

