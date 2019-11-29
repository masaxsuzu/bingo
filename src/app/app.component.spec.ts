import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { range } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bingo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    expect(app.title).toEqual('bingo');
  });

  it(`should have ${111} numbers`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    expect(app.numbers.length).toEqual(111);
  });

  it(`should have ${162} items`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    expect(app.items.length).toEqual(162);
  });

  it(`should display 'MS' initially`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    expect(app.display(app.current)).toEqual('MS');
  });

  it(`should format 1st item as '001'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    expect(app.format(app.items[0].n)).toEqual('001');
  });

  it(`should increment by 111`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    app.interval = 0;
    for (let index = 0; index < 112; index++) {
      await app.start();
    }
    expect(app.current).toEqual(111);
  });

  it(`should reset`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    app.interval = 0;
    for (let index = 0; index < 3; index++) {
      await app.start();
    }
    app.reset();
    expect(app.current).toEqual(0);
  });

  it(`should restore at initialization`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.reset();
    app.interval = 0;
    for (let index = 0; index < 3; index++) {
      await app.start();
    }
    const current = app.current;
    const numbers = app.numbers;
    const items = app.items;
    app.current = -123;
    app.numbers = ['none'];
    app.items = [1, '3'];
    app.initialize();

    expect(app.current).toEqual(current);
    expect(app.numbers).toEqual(numbers);
    expect(app.items).toEqual(items);
  });

});
