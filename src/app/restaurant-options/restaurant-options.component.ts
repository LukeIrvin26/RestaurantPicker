import { Component, OnInit } from '@angular/core';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppSettings} from '../appsettings';
import {MapService} from '../services/map.service';
import {ToastrService} from 'ngx-toastr';
import {DataHelper} from '../helpers/data.helper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restaurant-options',
  templateUrl: './restaurant-options.component.html',
  styleUrls: ['./restaurant-options.component.scss']
})
export class RestaurantOptionsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private mapService: MapService,
              private toastrService: ToastrService,
              private dataHelper: DataHelper,
              private router: Router) { }
  sliderValue = 1;
  options: Options = {
    floor: 1,
    ceil: 25,
    translate: (value: number): string => {
      return 'Max driving distance ' + value + ' mi';
    }
  };
  priceRanges = AppSettings.priceRanges;
  selectedPrice = {
    id: 99,
    priceRange: 'How much?'
  };

  optionsForm: FormGroup;
  addressCtrl: FormControl;
  searchCtrl: FormControl;
  submitted = false;
  loading = false;
  latitude: any;
  longitude: any;

  public static getMeters(miles: number): number {
    return miles * 1609.34;
  }

  ngOnInit() {
    this.addressCtrl = this.formBuilder.control('', Validators.required);
    this.searchCtrl = this.formBuilder.control('');
    this.optionsForm = this.formBuilder.group({
      address: this.addressCtrl,
      query: this.searchCtrl
    });
  }

  changeDropText(price: any) {
    this.selectedPrice = price;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addressCtrl.errors || (this.searchCtrl.value === '' && this.selectedPrice.id === 99)) {
      return;
    }

    this.loading = true;
    const self = this;
    this.mapService.getGeocode(this.addressCtrl.value).subscribe((result: any) => {
      if (result.results.length > 1) {
        self.toastrService.error('Please enter a more specific address');
      } else {
        self.latitude = result.results[0].geometry.location.lat;
        self.longitude = result.results[0].geometry.location.lng;
        const meters = RestaurantOptionsComponent.getMeters(self.sliderValue);
        self.mapService.getPlace(self.latitude, self.longitude, meters, self.searchCtrl.value, self.
          selectedPrice.id).subscribe((res: any) => {
          self.dataHelper.placeStorage = res.results[Math.floor(Math.random() * res.results.length)];
          self.toastrService.success('Restaurant picked!');
          self.router.navigate(['results']).then(() => {
            console.log('Navigation occured');
          }).catch(err => {
            console.error(err);
          });
        });
      }
    });
  }
}
