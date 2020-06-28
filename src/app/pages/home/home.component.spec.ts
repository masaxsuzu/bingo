import { Observable } from 'rxjs';
import { ViewContainerRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { AudioService } from '../../services/audio.service';
import { ConfirmService } from '../../services/confirm.service';

class MockAudio {
  start(): void { }
  stop(): void { }
}

class MockConfirm {
  ok = true;
  param: any;
  openModal = (viewContainerRef: ViewContainerRef, param: any): Observable<any> => {
    this.param = param;
    return new Observable(subscriber => {
      if (this.ok) {
        subscriber.next('OK');
        subscriber.complete();
      } else {
        subscriber.next('Cancel');
        subscriber.complete();
      }
  }); }
}

describe('HomeComponent', () => {
  const mockAudio: MockAudio = new MockAudio();
  const mockConfirm: MockConfirm = new MockConfirm();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: AudioService, useValue: mockAudio },
        { provide: ConfirmService, useValue: mockConfirm },
      ]
    }).compileComponents();
  }));

  afterEach(async () => {
    mockConfirm.ok = true;
  });

  it('should create the home', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have ${111} numbers`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.numbers.length).toEqual(111);
  });

  it(`should have ${162} items`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.items.length).toEqual(9);
    expect(app.items[0].length).toEqual(18);
    expect(app.items[1].length).toEqual(18);
    expect(app.items[2].length).toEqual(18);
    expect(app.items[3].length).toEqual(18);
    expect(app.items[4].length).toEqual(18);
    expect(app.items[5].length).toEqual(18);
    expect(app.items[6].length).toEqual(18);
    expect(app.items[7].length).toEqual(18);
    expect(app.items[8].length).toEqual(18);
  });

  it(`should display 'MS' initially`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.display(app.current)).toEqual('MS');
  });

  it(`should format 1st item as '001'`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.format(app.items[0][0].n)).toEqual('001');
  });

  it(`should increment by 111`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    app.interval = 0;
    for (let index = 0; index < 120; index++) {
      await app.start();
    }
    expect(app.current).toEqual(111);
  });

  it(`should reset`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    app.interval = 0;
    for (let index = 0; index < 3; index++) {
      await app.start();
    }
    await app.reset();
    expect(app.current).toEqual(0);
  });

  it(`should not reset if canceled`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    app.interval = 0;
    for (let index = 0; index < 3; index++) {
      await app.start();
    }

    mockConfirm.ok = false;
    await app.reset();
    expect(app.current).toEqual(3);
  });

  it(`should reset with message 'Do you really want to reset the result?' `, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();

    expect(mockConfirm.param.contents).toEqual('Do you really want to reset the result?');
  });

  it(`should restore at initialization`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;
    await app.reset();
    app.interval = 0;
    for (let index = 0; index < 3; index++) {
      await app.start();
    }
    const current = app.current;
    const numbers = app.numbers;
    const items = app.items;
    app.current = -123;
    app.numbers = ['none'];
    app.items = [[1], ['3']];
    app.initialize();

    expect(app.current).toEqual(current);
    expect(app.numbers).toEqual(numbers);
    expect(app.items).toEqual(items);
  });

});
