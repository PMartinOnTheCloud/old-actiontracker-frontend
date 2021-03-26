
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";


export interface MessageDialogData {
    title: string;
    message: string;
    cancelText: string;
    confirmText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class ConfirmDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: MessageDialogData) {}
}
