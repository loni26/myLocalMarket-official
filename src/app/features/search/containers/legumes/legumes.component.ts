import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/shared/modal/modal-info/modal-info.component';
import { MarketService } from 'src/app/shared/services/market.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-legumes',
  templateUrl: './legumes.component.html',
  styleUrls: ['./legumes.component.scss']
})
export class LegumesComponent implements OnInit {
  url: string = "../../../../../assets/default-img/market.png";
  legumes$: Observable<any>;

  constructor(private _ps: ProductService, public modalCtrl: ModalController, private _mk: MarketService) {
    this.legumes$ = this._ps.getLegumes();
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
