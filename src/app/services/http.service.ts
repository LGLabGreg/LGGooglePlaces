import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
 
@Injectable()
export class HttpService {
 
  constructor(private http: Http) { }

  get(url: string){
    return this.http.get(url).map((res:Response) => res.json());
  }

  post(url: string, data: Object){
    return this.http.post(url, data).map((res:Response) => res.json());
  }
 
}

