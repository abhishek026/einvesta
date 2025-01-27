import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalbeComponent } from './talbe.component';

describe('TalbeComponent', () => {
  let component: TalbeComponent;
  let fixture: ComponentFixture<TalbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalbeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
