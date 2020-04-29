import { Component, Optional, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  template :
  `
    <h1 mat-dialog-title>
      <div style="display:flex; align-items :center">
        <i class="material-icons" style="color : rgb(228,155,15)">help_outline</i>{{title}}
      </div>
    </h1>
    <mat-dialog-content>
      <!-- https://angular.io/guide/template-syntax#!#property-binding-or-interpolation- -->
      <div [innerHTML]="content"></div>
    </mat-dialog-content>

    <!-- <mat-dialog-actions> --><!-- 左 left -->
    <mat-dialog-actions  style="justify-content:center"><!-- 中央 center -->
    <!-- <mat-dialog-actions style="justify-content:flex-end"> --><!-- 右 right -->
      <button mat-button [mat-dialog-close]="'cancel'">cancel</button>
      <button mat-button [mat-dialog-close]="'ok'">OK</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent implements OnInit {

  public title: string;
  public content: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit(): void {
    const config = this.data;
    this.title = config.title;
    this.content = config.content;
  }
}