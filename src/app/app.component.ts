import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InsertPage } from '../pages/insert/insert';
import { LoginPage } from '../pages/login/login';
import { LoginService } from '../services/login.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    private loginService: LoginService, private loadingController: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'body'},
      { title: 'Nuevo Post', component: InsertPage , icon: 'create'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  
  /**
   * Llama la funcion logout del servicio Login
   */
  goBack(){
    console.log('Saliendo...');
    this.loading();
    this.loginService.logOut();
    this.nav.setRoot(LoginPage);
  }

  loading() {
    let loading = this.loadingController.create({
      content: 'Saliendo...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

}
