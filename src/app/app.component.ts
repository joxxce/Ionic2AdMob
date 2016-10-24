import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {AdMob} from 'ionic-native'
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      interface AdMobType {
        banner:string,
        interstitial:string
      };

      var admobid:AdMobType;

      // select the right Ad Id according to platform
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = { // for Android
          banner: 'ca-app-pub-2157350668398565/4134905931',
          interstitial: 'ca-app-pub-2157350668398565/5472038333'
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
          banner: 'ca-app-pub-6869992474017983/4806197152',
          interstitial: 'ca-app-pub-6869992474017983/7563979554'
        };
      } else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-6869992474017983/8878394753',
          interstitial: 'ca-app-pub-6869992474017983/1355127956'
        };
      }

      if(AdMob)  AdMob.createBanner( {
        adId:admobid.banner,
        // isTesting:true,//comment this out before publishing the app
        autoShow:true
      });
      if(AdMob) {
        AdMob.prepareInterstitial({
          adId: admobid.interstitial,
          isTesting:true,//comment this out before publishing the app
          autoShow: true
        });
      }
    });
  }
}
