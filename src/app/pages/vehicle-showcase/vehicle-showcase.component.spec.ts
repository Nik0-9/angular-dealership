import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleShowcaseComponent } from './vehicle-showcase.component';

describe('VehicleShowcaseComponent', () => {
  let component: VehicleShowcaseComponent;
  let fixture: ComponentFixture<VehicleShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleShowcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
