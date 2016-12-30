import {Component, Injectable} from '@angular/core';

export interface Preloader {
   visible: boolean;
}

@Injectable()
export class PreloaderService {

  preloader: Preloader = {visible: false}; 

  constructor() { }

  showLoader(){
     this.preloader.visible = true;
  }

  hideLoader(){
    this.preloader.visible = false;
  }

}

