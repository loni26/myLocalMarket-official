import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModalInfoComponent } from 'src/app/shared/modal/modal-info/modal-info.component';
import { MarketService } from 'src/app/shared/services/market.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent implements OnInit {
  url: string = "../../../../../assets/default-img/market.png";
  boissons$: Observable<any>;
  constructor(private _ps: ProductService, public modalCtrl: ModalController, private _mk: MarketService) { 
    this.boissons$ = this._ps.getBoissons();
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
