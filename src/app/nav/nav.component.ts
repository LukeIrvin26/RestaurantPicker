import { Component, OnInit } from '@angular/core';
import {faUtensils} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  faUtensils = faUtensils;
  constructor() { }

  ngOnInit() {
  }

}
