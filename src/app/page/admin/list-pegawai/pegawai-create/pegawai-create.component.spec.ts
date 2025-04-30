import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegawaiCreateComponent } from './pegawai-create.component';

describe('PegawaiCreateComponent', () => {
  let component: PegawaiCreateComponent;
  let fixture: ComponentFixture<PegawaiCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PegawaiCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegawaiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
