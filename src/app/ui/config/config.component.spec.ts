import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigComponent } from './config.component';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigComponent ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    expect(component.max).toBe(100);
  });
});
