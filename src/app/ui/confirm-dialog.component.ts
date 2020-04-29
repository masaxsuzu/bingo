import { Component, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-modal-template',
  template: `
      <div id="modal-container" [class]="data.class" [@openClose]="isOpen ? 'open' :'closed' ">
         <h2>{{data.title}}</h2>
         <div [innerHtml]="data.contents"></div>
         <p>
         <button class=modal-button id=button-modal-ok (click)="data.click('OK'); closeModal()">Ok</button>
         <button class=modal-button id=button-modal-ng (click)="data.click('Cancel'); closeModal()">No thanks</button>
         </p>
      </div>

      <div id="overlay" (click)="data.click(); closeModal()" [@openClose]="isOpen ? 'open' :'closed'"></div>
      `,
  styleUrls: ['./confirm-dialog.component.less'],
  // アニメーションの設定
  // opacityの遷移をアニメーションにする。
  // 遷移にかける時間は0.2s
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        display: 'none',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
      transition('* => void', [
        animate('0.2s')
      ]),
      transition('void => *', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class ConfirmDialogComponent implements OnDestroy {

  @Input() data: any;
  isOpen: boolean;

  constructor() {
    this.isOpen = true;
  }

  /*
   * モーダルウィンドウを非表示にする。
   * ウィンドウの破棄は次にモーダルウィンドウのを呼び出したときに、
   * モーダルサービスで行うため、ここでは非表示にするだけ。
  */
  closeModal() {
    this.isOpen = false;
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {

  }
}