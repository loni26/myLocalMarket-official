import { finalize, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CameraResultType, Camera, Plugins } from '@capacitor/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  user: string;
  photoServerURL$;
  uploadedImgURL: string;
  phFile;
  constructor(private _storage:  AngularFireStorage, private _auth: UserService) {
    /* this._auth.getCurrentUser().then( user => {
      this.user = user.uid
    }
    ); */
   }

  async takePicture(){
   const img:any = await Plugins.Camera.getPhoto({
      quality:90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    }).catch(
      err => {
        console.log(err);
      }
    );


      const imagename = Date.now() + img.format;
      this.phFile = this._storage.ref('photo-produit').child(imagename).putString(img.Uri, 'uri', {contentType:'img/jpg'})



   

  const photoPathServer = `photo-produit/${this.user}/${imagename}`;
  const photoRef = this._storage.ref(photoPathServer);
      console.log('----->',photoPathServer);
      
  const currentUpload = this._storage.upload(
    photoPathServer,
    this.phFile
    )

    currentUpload.catch((err) => console.error(err));

    currentUpload
        .snapshotChanges()
        .pipe(
          tap((val) => console.log('before finalize()', val)),
          finalize(() => {
            this.photoServerURL$ = photoRef.getDownloadURL();
            console.log('photoServerURL', this.photoServerURL$);

            this.photoServerURL$.subscribe((data) => {
              console.log('data ', data);
              this.uploadedImgURL = data;
    
            });
          })
        )
        .subscribe();

     /* const photoRef=this._storage.ref('photo-produit').child(imagename).putString(img.base64String, 'base64', {contentType:'img/jpg'}); */
    
  }
}
