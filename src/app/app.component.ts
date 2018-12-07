
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {ShoppinglistService} from './shopping-list/shoppinglist.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  ngOnInit(){
    firebase.initializeApp({
      apiKey: 'AIzaSyC8qShwsARCpZfcRzt4BKQin3ik4R5ZaGU',
      authDomain: 'ng-recipes-3b275.firebaseapp.com',
    });
  }

  constructor(private shoppinglistService: ShoppinglistService) {
  }

}
