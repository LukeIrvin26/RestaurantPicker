import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantOptionsComponent} from './restaurant-options/restaurant-options.component';
import {ResultsComponent} from './results/results.component';
import {ReviewsComponent} from './reviews/reviews.component';

const routes: Routes = [
  {path: '', redirectTo: 'options', pathMatch: 'full'},
  {path: 'options', component: RestaurantOptionsComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'reviews', component: ReviewsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
