import { Component } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'home',
  host: {
    class: 'wrapper content'
  },
  templateUrl: './home.component.html'
})

export class HomeComponent {

  private locationError: boolean = false;
  private locationErrorMsg: string;

  constructor(
    private preloaderService: PreloaderService,
    private geolocationService: GeolocationService
  ) {

  }

  ngOnInit() {
  }

  public getLocation = () => {
    this.preloaderService.showLoader(); 
    this.geolocationService.getLocation().subscribe(
      (position) => {
        console.log('location success latitude: ' + position.coords.latitude )
        console.log('location success longitude: ' + position.coords.longitude )
        this.preloaderService.hideLoader();
      },
      (error) => {
        console.log('location error: ' + JSON.stringify(error) )
        this.preloaderService.hideLoader();
      }
    );
  }

};
