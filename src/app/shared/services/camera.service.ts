import { finalize, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CameraResultType, Camera, Plugins, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  photo: SafeResourceUrl;
  image;
  uploadPercent;
  downloadURL$: Observable<string>;
  constructor(private _afs:  AngularFireStorage, private _auth: UserService, private sanitizer: DomSanitizer) {
   }

  

  async takePicture(){
    this.image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.image && this.image.dataUrl
    );
  }

  async save() {
    var user = JSON.parse(localStorage.getItem('user'));
    const filePath = 'user_image';
    const ref = this._afs.ref(filePath).child(user.uid);
    const file = this.dataURLtoFile(this.image.dataUrl, Date.now());
    const task = this._afs.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL$ = ref.getDownloadURL())))
      .subscribe();
  }

  

  dataURLtoFile(dataUrl, filename) {
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  getPhoto(){
    return this.photo;
  }
  
}
