import { Observable } from 'rxjs';
import { MarketService } from './../../services/market.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {

  myMarket$: Observable<any>;

  constructor( public modalCtrl: ModalController, private _mk: MarketService) {

    this.myMarket$ = this._mk.market$;
   }

  ngOnInit(): void {
  }

}
