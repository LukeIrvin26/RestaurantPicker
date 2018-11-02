import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOptionsComponent } from './restaurant-options.component';

describe('RestaurantOptionsComponent', () => {
  let component: RestaurantOptionsComponent;
  let fixture: ComponentFixture<RestaurantOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
