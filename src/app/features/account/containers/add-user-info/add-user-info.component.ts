import { CameraService } from './../../../../shared/services/camera.service';
import { MarketService } from './../../../../shared/services/market.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const  HTTP_URL_PATTERN:string = '^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';

@Component({
  selector: 'app-add-user-info',
  templateUrl: './add-user-info.component.html',
  styleUrls: ['./add-user-info.component.scss']
})
export class AddUserInfoComponent implements OnInit {

  url: any ='';
  userInfoForm: FormGroup;

  constructor(private _mk: MarketService, private fb: FormBuilder, private _camera: CameraService) {
  }

  ngOnInit(): void {
    this.userInfoForm = this.fb.group({
      domainName: ['', Validators.required],
      domainAddress: ['', Validators.required],
      localite: ['', Validators.required],
      cp: ['', Validators.required],
      courriel: ['', Validators.required],
      adWeb: ['', Validators.required],
      numero: ['', Validators.required],
      // gérant information
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      image: ['', Validators.pattern(HTTP_URL_PATTERN)]
    })

  }

  onFileChange(event){
    console.log('------>', event.target.files[0]);
    // event.target.files[0]
  }

  registerUserInfo(): void {
    const domainName: string = this.userInfoForm.value.domainName;
    const domainAddress: string = this.userInfoForm.value.domainAddress;
    const localite: string = this.userInfoForm.value.domainAddress;
    const cp: string = this.userInfoForm.value.cp;
    const courriel: string = this.userInfoForm.value.courriel;
    const adWeb: string = this.userInfoForm.value.adWeb;
    const numero: string = this.userInfoForm.value.numero;
    const lastName: string = this.userInfoForm.value.lastName;
    const firstName: string = this.userInfoForm.value.firstName;

    this._mk.createInfoUser(domainName, domainAddress, localite,
      cp, courriel, adWeb, numero, lastName, firstName);

      this._camera.save();

    this.userInfoForm.reset();
  }

  async takePhoto() {
    this._camera.takePicture();
     this.url = await this._camera.getPhoto();
  }

}
