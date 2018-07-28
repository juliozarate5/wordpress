import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { LoginService } from '../../services/login.service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;
  isLogin: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService, 
    private alertController: AlertController) {
    let token = localStorage.getItem('token');
    if(token == '1'){
      navCtrl.setRoot(HomePage);
    }
  }

  /**
   * realiza la petición al servicio para login
   */
  login(){
    let user = {username: this.username, password: this.password};
    this.loginService.logIn(user)
      .subscribe(
        rs => this.isLogin = rs,
        er => {this.showAlert()},
        () => {
          if(this.isLogin){
            this.navCtrl.setRoot(HomePage)
              .then(data => console.log(data)),
              error => console.log(error);
          }else{
              console.log('Error de Login');
          }
        }
      );
  }

  showAlert(){
    let alert = this.alertController.create({
      title: '',
      subTitle: 'Error al intentar ingresar',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
