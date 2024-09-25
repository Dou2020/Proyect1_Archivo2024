import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaInsertComponent } from './factura-insert.component';

describe('FacturaInsertComponent', () => {
  let component: FacturaInsertComponent;
  let fixture: ComponentFixture<FacturaInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
