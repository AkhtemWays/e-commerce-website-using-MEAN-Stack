import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorizedProductsComponent } from './categorized-products.component';

describe('CategorizedProductsComponent', () => {
  let component: CategorizedProductsComponent;
  let fixture: ComponentFixture<CategorizedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorizedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorizedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
