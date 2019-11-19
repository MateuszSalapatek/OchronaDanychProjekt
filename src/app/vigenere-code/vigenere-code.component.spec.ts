import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigenereCodeComponent } from './vigenere-code.component';

describe('VigenereCodeComponent', () => {
  let component: VigenereCodeComponent;
  let fixture: ComponentFixture<VigenereCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigenereCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigenereCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
