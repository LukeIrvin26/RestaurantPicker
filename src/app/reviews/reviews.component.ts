import { Component, OnInit } from '@angular/core';
import {DataHelper} from '../helpers/data.helper';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: any;
  constructor(private dataHelper: DataHelper) { }

  ngOnInit() {
    this.reviews = this.dataHelper.reviewStorage;
  }

}
