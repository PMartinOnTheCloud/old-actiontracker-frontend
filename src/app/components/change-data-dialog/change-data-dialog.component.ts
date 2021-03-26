
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ValidationResource} from '../../models/validators';
import {clone} from '../../utils/functions';
import {isUndefined} from 'util';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-change-data-dialog',
    templateUrl: './change-data-dialog.component.html',
    styleUrls: ['./change-data-dialog.component.scss']
})
export class ChangeDataDialogComponent<T> {

    public clonedEntity: T;

    constructor(@Inject(MAT_DIALOG_DATA) public data: ValidationResource<T>,
                public translate: TranslateService) {
        this.clonedEntity = clone(data.item, {deep: true});
    }

}
