import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCartComponent } from './insert-cart.component';

describe('InsertCartComponent', () => {
  let component: InsertCartComponent;
  let fixture: ComponentFixture<InsertCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
