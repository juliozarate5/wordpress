import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *  Esta clase interactua con la vista de edición del post
 */
import { PostService } from '../../services/post.service';
import { Post } from '../../services/post';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  id: number;
  post: Post[];
  private loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: PostService, 
    private toastController:ToastController, private loadingController: LoadingController) {//inyectamos el servicio y el toast
      let token = localStorage.getItem('token');
      if(token != '1'){
        navCtrl.setRoot(LoginPage);
      }
      this.id = this.navParams.get('id');
  }

  /**
   * carga el detalle del post para colocarlos en los input a editar
   * @param id 
   */
  loadDetail(id) {
    this.showLoading();
    this.postService.getPostById(id)
      .subscribe(
        rs => this.post = rs,
        err => console.log(err),
        () => {console.log("OK detail"), this.hideLoading()}
      );
  }

  /**
   * guardar los cambios de los valores editados
   */
  saveChangePost(){
    this.postService.editPost(this.post)
      .subscribe(
        rs => console.log(rs),
        err => {console.log(err), this.showAlert("Error al actualizar post")},
        () => {console.log('Listo Update'), this.showAlert("Se ha modificado el Post!")}
      );
     this.cancel();
  }

  /**
   * sale de la pagina actual hacia la pagina root
   */
  cancel(){
    this.navCtrl.setRoot(HomePage);
  }

  showAlert(msg){
    const toast = this.toastController.create({
      message: msg,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }

  showLoading(){
    this.loading = this.loadingController.create({
      content: 'Por favor, Espere...'
    });
  
    this.loading.present();
  }

  hideLoading(){
    return this.loading.dismiss();
  }

  ionViewWillEnter(){
    this.loadDetail(this.id);
  }

  ionViewDidLoad() {
    console.log('Editar cargado...');
  }

}
