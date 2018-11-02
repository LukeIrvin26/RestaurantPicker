import { Component, OnInit } from '@angular/core';
import {DataHelper} from '../helpers/data.helper';
import {MapService} from '../services/map.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  randomRestaurant = '';
  lat: number;
  lng: number;
  photos: any;
  photoReferences: string[] = [];
  apiKey = environment.apiKey;
  photosURL = environment.googlePhotosURL;
  placeId: any;
  address: string;
  phoneNumber: string;
  rating: number;
  website: string;

  constructor(private dataHelper: DataHelper,
              private mapService: MapService) { }

  ngOnInit() {
    this.randomRestaurant = this.dataHelper.placeStorage.name;
    this.lat = this.dataHelper.placeStorage.geometry.location.lat;
    this.lng = this.dataHelper.placeStorage.geometry.location.lng;
    this.placeId = this.dataHelper.placeStorage.place_id;
    const self = this;

    this.mapService.getPlaceDetails(this.placeId).subscribe((result: any) => {
      self.address = result.result.formatted_address;
      self.phoneNumber = result.result.formatted_phone_number;
      self.rating = result.result.rating;
      self.website = result.result.website;
      self.dataHelper.reviewStorage = result.result.reviews;
      self.photos = result.result.photos;
      self.photos.forEach(obj => {
        self.photoReferences.push(obj.photo_reference);
      });
    });
  }
}
