import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvenComponent } from './inven.component';

describe('InvenComponent', () => {
  let component: InvenComponent;
  let fixture: ComponentFixture<InvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
