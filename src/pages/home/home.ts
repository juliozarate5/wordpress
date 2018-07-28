import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

//importamos el servicio y clase modelo
import { PostService } from '../../services/post.service';
import { Post } from '../../services/post';

//importamos clase detail pagina
import { DetailPage } from '../detail/detail';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postList: Post[];
  private logged: boolean;
  private loading: any;


  constructor(public navCtrl: NavController, private postService: PostService, private loadingController: LoadingController,
    private toastController: ToastController) {//inyección de variable PostService
    let token = localStorage.getItem('token');
    if(token != '1'){
      navCtrl.setRoot(LoginPage);
    }
  }

  /**
   * Obtiene todos los post
   */
  getPosts() {
    this.showLoading();
    this.postService.getPosts()
      .subscribe(
        rs => this.postList = rs,
        er => {console.log(er), this.showAlert("Error al cargar posts"),this.hideLoading()},
        () => this.hideLoading()// cuando se ha ejecutado todo
      );
  }

  /**
   * muestra detalle de un post según su id
   * @param post 
   */
  showPost(post){
    this.navCtrl.push(DetailPage, {
      id: post.id
    });
  }

  /**
   * muestra el componente loading
   */
  showLoading(){
    this.loading = this.loadingController.create({
      content: 'Por favor, Espere...'
    });
  
    this.loading.present();
  }

  /**
   * oculta el componente loading
   */
  hideLoading(){
    return this.loading.dismiss();
  }

  /**
   * muestra el componente toast
   * @param mess 
   */
  showAlert(mess){
    const toast = this.toastController.create({
      message: mess,
      duration: 3000,

      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }

  /**
   * acción al arrastrar refresh
   * @param refresher 
   */
  doRefresh(refresher) {
    this.getPosts();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  ionViewWillEnter(){
    this.getPosts();
  }

}
