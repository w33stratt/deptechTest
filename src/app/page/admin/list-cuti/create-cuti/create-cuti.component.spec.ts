import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCutiComponent } from './create-cuti.component';

describe('CreateCutiComponent', () => {
  let component: CreateCutiComponent;
  let fixture: ComponentFixture<CreateCutiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCutiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
