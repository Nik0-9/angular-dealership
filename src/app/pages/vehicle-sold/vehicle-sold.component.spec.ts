import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSoldComponent } from './vehicle-sold.component';

describe('VehicleSoldComponent', () => {
  let component: VehicleSoldComponent;
  let fixture: ComponentFixture<VehicleSoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleSoldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
