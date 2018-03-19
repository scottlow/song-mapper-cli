import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemoriesComponent } from './view-memories.component';

describe('ViewMemoriesComponent', () => {
  let component: ViewMemoriesComponent;
  let fixture: ComponentFixture<ViewMemoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
