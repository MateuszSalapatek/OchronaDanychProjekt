import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayfairCodeComponent} from './playfair-code.component';

describe('PlayfairCodeComponent', () => {
  let component: PlayfairCodeComponent;
  let fixture: ComponentFixture<PlayfairCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayfairCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayfairCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
