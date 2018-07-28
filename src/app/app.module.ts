import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//importamos el servicio post
import { PostService } from '../services/post.service';
import { HttpModule } from '@angular/http'; 
import { DetailPage } from '../pages/detail/detail';
import { EditPage } from '../pages/edit/edit';
import { InsertPage } from '../pages/insert/insert';
import { LoginPage } from '../pages/login/login';
import { LoginService } from '../services/login.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    EditPage,
    InsertPage,
    LoginPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    EditPage,
    InsertPage,
    LoginPage
  ],
  providers: [
    PostService,
    LoginService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
