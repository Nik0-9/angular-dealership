import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
