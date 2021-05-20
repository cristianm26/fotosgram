import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare let window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages: string[] = [];
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }
  constructor(private _postService: PostsService, private route: Router, private geolocation: Geolocation,
    private _camera: Camera) { }
  async crearPost() {
    const creado = await this._postService.crearPost(this.post);
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    }
    this.tempImages =[];
    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    this.cargandoGeo = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
    });
  }
  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.CAMERA
    };

    this.procesarImagen(options);
  }
  galeria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this._camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this._postService.subirImagen(imageData)
      this.tempImages.push(img)
    }, (err) => {
      // Handle error
    });
  }
}
