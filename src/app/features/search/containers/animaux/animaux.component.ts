import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MarketService } from 'src/app/shared/services/market.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ModalInfoComponent } from 'src/app/shared/modal/modal-info/modal-info.component';

@Component({
  selector: 'app-animaux',
  templateUrl: './animaux.component.html',
  styleUrls: ['./animaux.component.scss']
})
export class AnimauxComponent implements OnInit {
  url: string = "../../../../../assets/default-img/market.png";
  animaux$: Observable<any>;

  constructor(private _ps: ProductService, public modalCtrl: ModalController, private _mk: MarketService) { 
    this.animaux$ = this._ps.getAnimaux();
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
