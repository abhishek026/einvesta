import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyHomeComponent } from './strategy-home.component';

describe('StrategyHomeComponent', () => {
  let component: StrategyHomeComponent;
  let fixture: ComponentFixture<StrategyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategyHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
