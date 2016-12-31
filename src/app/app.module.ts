import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* services */
import { PreloaderService } from './services/preloader.service';
import { GoogleService } from './services/google.service';
import { GeolocationService } from './services/geolocation.service';

/* router */
import { AppRoutingModule } from './app.route';

/* components */
import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainFooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    PreloaderService,
    GoogleService,
    GeolocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
