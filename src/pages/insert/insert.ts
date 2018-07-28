import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Clase para creacion de nuevos posts
 * Generated class for the InsertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { PostService } from '../../services/post.service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-insert',
  templateUrl: 'insert.html',
})
export class InsertPage {
 
  form: FormGroup;
  private loading: any;

  constructor(public navCtrl: NavController, private fB: FormBuilder, private postService: PostService, 
    private toastController: ToastController, private loadingController: LoadingController) {
    let token = localStorage.getItem('token');
    if(token != '1'){
      navCtrl.setRoot(LoginPage);
    }
    this.createForm();
  }

  /**
   * crea un form con los campos para crear nuevo post
   */
  createForm(){
    this.form = this.fB.group({
      title : ['', Validators.required],
      content : ['', Validators.required]
    });
  }

  /**
   * guardar un nuevo post
   */
  savePost(){
    this.showLoading();
    this.postService.savePost(this.form.value)
      .subscribe(
        rs => console.log(rs),
        er => {console.log(er), this.hideLoading(), this.showAlert("Error al guardar post")},
        () => {console.log('Listo Insert'), this.hideLoading(), this.showAlert("Se ha creado nuevo Post!")}
      );
  }

  /**
   * muestra el componente toast cuando es llamdo
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
   * muestra componente loading
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertPage');
  }

}
