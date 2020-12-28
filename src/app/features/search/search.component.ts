import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
 
  constructor(private _router: Router) {
    
   }
    
  ngOnInit(): void {
  }

  searchFr(){
    this._router.navigate(['/fruits'])
  }

}
