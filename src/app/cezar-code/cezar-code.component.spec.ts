import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CezarCodeComponent } from './cezar-code.component';

describe('CezarCodeComponent', () => {
  let component: CezarCodeComponent;
  let fixture: ComponentFixture<CezarCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CezarCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CezarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
