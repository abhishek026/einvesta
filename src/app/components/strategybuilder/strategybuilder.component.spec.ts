import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategybuilderComponent } from './strategybuilder.component';

describe('StrategybuilderComponent', () => {
  let component: StrategybuilderComponent;
  let fixture: ComponentFixture<StrategybuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategybuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategybuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
