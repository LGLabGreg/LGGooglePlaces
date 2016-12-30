import { Component } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';

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
    private preloaderService: PreloaderService
  ) {

  }

  ngOnInit() {
    //this.preloaderService.showLoader();
  }

  public positionSuccess = (position) => {
    this.preloaderService.hideLoader();
    console.log('location success latitude: ' + position.coords.latitude )
    console.log('location success longitude: ' + position.coords.longitude )
  }

  public positionFail = (error) => {
    this.preloaderService.hideLoader();
    console.log('location error: ' + JSON.stringify(error) )
  }

  public getLocation = () => {
    this.preloaderService.showLoader(); 
    if (navigator.geolocation) {
      //TODO: Handle user selecting "Not now"
      window.navigator.geolocation.getCurrentPosition(this.positionSuccess.bind(this), this.positionFail.bind(this));
    } else {
      this.preloaderService.hideLoader();
      this.locationErrorMsg = "Geolocation is not supported by this browser.";
      this.locationError = true;
    }
  }

  


};
