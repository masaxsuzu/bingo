import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConfirmService } from '../../services/confirm.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      providers: [
        { provide: ConfirmService},
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should be close', () => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      title: 'Danger!',
      contents: 'Do you really want to reset the result?',
      class: 'modal'
    };

    component.closeModal();
    expect(component.isOpen).toBe(false);
  });

  it('should be OK', () => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      title: 'Danger!',
      contents: 'Do you really want to reset the result?',
      class: 'modal'
    };
    const service = TestBed.inject(ConfirmService);

    let got: any;
    service.openModal(component.viewContainerRef, component.data).subscribe(click => {
      got = click;
    });

    const ok = fixture.debugElement.query(By.css('#button-modal-ok'));

    ok.nativeElement.click();

    expect(component.isOpen).toBe(false);
    expect(got).toBe('OK');
  });

  it('should cancel', () => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      title: 'Danger!',
      contents: 'Do you really want to reset the result?',
      class: 'modal'
    };
    const service = TestBed.inject(ConfirmService);
    let got: any;
    service.openModal(component.viewContainerRef, component.data).subscribe(click => {
      got = click;
    });
    const ng = fixture.debugElement.query(By.css('#button-modal-ng'));

    ng.nativeElement.click();

    expect(component.isOpen).toBe(false);
    expect(got).toBe('Cancel');
  });
});
