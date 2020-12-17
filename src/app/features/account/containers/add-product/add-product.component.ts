import { CameraService } from './../../../../shared/services/camera.service';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  selected_value: string;
  myCategorie: string;
  categorie: string[] = ['Fruits', 'Legumes', 'Produits animaux', 'Boissons'];
  url: string = "../../../../../assets/default-img/market.png";
  constructor(private _fb: FormBuilder, private ps: ProductService, private _camera: CameraService ) { }
 

  ngOnInit(): void {
    this.productForm = this._fb.group({
      productName: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(80)]],
      categorie: ['', Validators.required],
      periode: ['', Validators.required]
    })
  }

  getselected(value){
    this.myCategorie= value;
  }

  addProduct():void {
    const name: string = this.productForm.value.productName;
    const description: string = this.productForm.value.description;
    const periode: string = this.productForm.value.periode;
    const categorie: string = this.productForm.value.categorie;

    this.ps.createNewProduct(name, description, periode, categorie);
  }

  takePhoto(){
    this._camera.takePicture();
  }

}
