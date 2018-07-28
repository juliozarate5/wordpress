import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { PostService } from '../../services/post.service';
import { Post } from '../../services/post';
import { EditPage } from '../edit/edit';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  id: string;
  post: Post[];
  private loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: PostService, 
    private loadingController: LoadingController) {

    this.id = this.navParams.get('id');
  }

  loadDetail(id) {
    this.showLoading();
    this.postService.getPostById(id)
      .subscribe(
        rs => this.post = rs,
        err => {console.log(err), this.hideLoading()},
        () => {console.log("Detail"), this.hideLoading()}
      );
  }

  editPost() {
    this.navCtrl.push(EditPage, {
      id: this.id
    });
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
    console.log('Detalle cargado!');
  }

}
