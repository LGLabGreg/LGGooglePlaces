import { Component } from '@angular/core';
import { Preloader, PreloaderService } from './services/preloader.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="preloader" *ngIf="preloader.visible"></div>
    <main-nav></main-nav>
    <router-outlet></router-outlet>
    <main-footer></main-footer>
   `
})
export class AppComponent {

  preloader: Preloader;

  constructor(private preloaderService: PreloaderService) {
    this.preloader = this.preloaderService.preloader;
  }
}

