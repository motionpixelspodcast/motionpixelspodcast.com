import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCardsComponent } from './feed-cards.component';

describe('FeedCardsComponent', () => {
  let component: FeedCardsComponent;
  let fixture: ComponentFixture<FeedCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
