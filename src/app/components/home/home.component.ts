import { Component } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';
import { GeolocationService } from '../../services/geolocation.service';
import { GoogleService } from '../../services/google.service';


@Component({
  selector: 'home',
  host: {
    class: 'wrapper content'
  },
  templateUrl: './home.component.html'
})

export class HomeComponent {

  private hasError: boolean = false;
  private errorMsg: string;

  constructor(
    private preloaderService: PreloaderService,
    private geolocationService: GeolocationService,
    private googleService: GoogleService
  ) {

  }

  ngOnInit() {

  }

  public getLocation = () => {
    this.hasError = false;
    this.preloaderService.showLoader(); 
    this.geolocationService.getLocation().subscribe(
      (position) => {

        this.googleService.createCurrentPositionMarker();
        this.preloaderService.hideLoader(); 

        let params: any = {
          location: {lat: position.coords.latitude, lng: position.coords.longitude},
          radius: 5000,
          types: ['food']
        }

        this.googleService.getPlaces(params).subscribe(
          data => {
            //console.log('getPlaces success: ' + JSON.stringify(data))
          },
          error => {
            this.handleError(error);
            console.error('getPlaces error: ' + error)
          }
        );
        
      },
      (error) => {
        console.log('location error: ' + JSON.stringify(error))
        this.handleError(error);
        this.preloaderService.hideLoader();
      }
    );
  }

  public requestSucceeded(data: any) {
    console.log('requestSucceeded' + JSON.stringify(data))

  }

  private handleError(error: string) {
    this.errorMsg = error;
    this.hasError = true;
  }

};
