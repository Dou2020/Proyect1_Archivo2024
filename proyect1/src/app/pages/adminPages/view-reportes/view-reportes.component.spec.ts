import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportesComponent } from './view-reportes.component';

describe('ViewReportesComponent', () => {
  let component: ViewReportesComponent;
  let fixture: ComponentFixture<ViewReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
