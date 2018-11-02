import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MapService {

  constructor(private http: HttpClient) {
  }

  public getGeocode(address: string) {
    return this.http.get(`${environment.googleGeocodeURL}address=${address}&key=${environment.apiKey}`);
  }

  public getPlace(latitude: string, longitude: string, radius: number, keyword: string, maxPrice: number) {
    return this.http.get(`${environment.googlePlacesURL}key=${environment.apiKey}&location=${latitude},
    ${longitude}&radius=${radius}&rankby=prominence&type=restaurant&keyword=${keyword}&maxprice=${maxPrice}&opennow=true`);
  }

  public getPlaceDetails(placeId: string) {
    return this.http.get(`${environment.googlePlacesDetailsURL}key=${environment.apiKey}&placeid=${placeId}`);
  }
}
