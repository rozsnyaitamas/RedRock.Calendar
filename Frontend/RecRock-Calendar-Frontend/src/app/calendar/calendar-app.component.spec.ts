import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAppComponent } from '@redrock/calendar/calendar-app.component';

describe('CalendarAppComponent', () => {
  let component: CalendarAppComponent;
  let fixture: ComponentFixture<CalendarAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
