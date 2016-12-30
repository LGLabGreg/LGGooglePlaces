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

  constructor(
    private preloaderService: PreloaderService
  ) {

  }

  ngOnInit() {
    //this.preloaderService.showLoader();
  }

};
