import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPopup } from './book-popup';

describe('BookPopup', () => {
  let component: BookPopup;
  let fixture: ComponentFixture<BookPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
