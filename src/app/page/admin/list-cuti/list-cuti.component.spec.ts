import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCutiComponent } from './list-cuti.component';

describe('ListCutiComponent', () => {
  let component: ListCutiComponent;
  let fixture: ComponentFixture<ListCutiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCutiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
