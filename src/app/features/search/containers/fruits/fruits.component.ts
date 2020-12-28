import { MarketService } from './../../../../shared/services/market.service';
import { ModalInfoComponent } from './../../../../shared/modal/modal-info/modal-info.component';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.scss']
})
export class FruitsComponent implements OnInit {
  fruits$: Observable<any>;
  url: string = "../../../../../assets/default-img/market.png";

  constructor(private _ps: ProductService, public modalCtrl: ModalController, private _mk: MarketService) {
    this.fruits$= this._ps.getFruits();
   }

  ngOnInit(): void {
  }

  async seeMore(userId: string){

    this._mk.readMarket(userId);
    const ionModal = await this.modalCtrl.create({
      component: ModalInfoComponent
    });
    ionModal.present();
    ionModal.onDidDismiss();
  }

}
