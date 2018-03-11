import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemoryComponent } from './new-memory.component';

describe('NewMemoryComponent', () => {
  let component: NewMemoryComponent;
  let fixture: ComponentFixture<NewMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
