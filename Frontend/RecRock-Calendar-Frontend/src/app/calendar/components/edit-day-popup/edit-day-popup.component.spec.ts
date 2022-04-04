import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDayPopupComponent } from '@redrock/calendar/components/edit-day-popup/edit-day-popup.component';

describe('EditDayPopupComponent', () => {
  let component: EditDayPopupComponent;
  let fixture: ComponentFixture<EditDayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDayPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
