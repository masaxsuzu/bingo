import { Observable } from 'rxjs';
import { ViewContainerRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AudioService } from './services/audio.service';
import { ConfirmService } from './services/confirm.service';
import { VersionService } from './services/version.service';

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

describe('AppComponent', () => {
  const mockAudio: MockAudio = new MockAudio();
  const mockConfirm: MockConfirm = new MockConfirm();
  const version: VersionService = new VersionService(1, 1, 0, 'test');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AudioService, useValue: mockAudio },
        { provide: ConfirmService, useValue: mockConfirm },
        { provide: VersionService, useValue: version }
      ]
    }).compileComponents();
  }));

  afterEach(async () => {
    mockConfirm.ok = true;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bingo'`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.title).toEqual('bingo');
  });

  it(`should have ${111} numbers`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.numbers.length).toEqual(111);
  });

  it(`should have ${162} items`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.items.length).toEqual(162);
  });

  it(`should display 'MS' initially`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.display(app.current)).toEqual('MS');
  });

  it(`should format 1st item as '001'`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();
    expect(app.format(app.items[0].n)).toEqual('001');
  });

  it(`should increment by 111`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();
    app.interval = 0;
    for (let index = 0; index < 120; index++) {
      await app.start();
    }
    expect(app.current).toEqual(111);
  });

  it(`should reset`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();
    app.interval = 0;
    for (let index = 0; index < 3; index++) {
      await app.start();
    }
    await app.reset();
    expect(app.current).toEqual(0);
  });

  it(`should not reset if canceled`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
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
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    await app.reset();

    expect(mockConfirm.param.contents).toEqual('Do you really want to reset the result?');
  });

  it(`should restore at initialization`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
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
    app.items = [1, '3'];
    app.initialize();

    expect(app.current).toEqual(current);
    expect(app.numbers).toEqual(numbers);
    expect(app.items).toEqual(items);
  });

});
