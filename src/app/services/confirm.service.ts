import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../ui/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  viewContainerRef: ViewContainerRef;

  subject: Subject<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public openModal(viewContainerRef: ViewContainerRef, param: any) {

    this.subject = new Subject();

    // モーダルウィンドウを二度目以降にに呼び出したときに、
    // 先に作成したモーダルウィンドウを破棄する。
    // しないと、モーダルウィンドウのDIV要素が永遠と増えていく。
    if (this.viewContainerRef) { this.viewContainerRef.clear(); }

    this.viewContainerRef = viewContainerRef;

    const componentRef = this.createComponent(ConfirmDialogComponent, viewContainerRef);

    componentRef.instance.data = param;
    param.click = this.retPublish();

    return this.subject.asObservable();
  }

  private createComponent(componentTemplate: any, viewContainerRef: ViewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentTemplate);
    return viewContainerRef.createComponent(componentFactory);

  }

  private retPublish() {
    const subject = this.subject;
    return (retVal: string) => {
      try {
        subject.next(retVal);
        subject.complete();
      } catch (err) {
        subject.error(err);
      }
    }
  }
}
