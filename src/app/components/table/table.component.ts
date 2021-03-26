
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {Subscription} from 'rxjs';

import {ResizeService} from '../../services/ResizeService';
import {DestroySubscribers} from '../../utils';
import {AssignableObject} from '../../models/AssignableObject';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
@DestroySubscribers()
export class TableComponent<T> {


    @Input() public columns: string[] = [];
    @Input() public sortableColumns: string[] = [];

    @Output() onItemClick: EventEmitter<T> = new EventEmitter();
    @Output() onDeleteClick: EventEmitter<T[]> = new EventEmitter();

    public isMobile: boolean;
    public showColumns: boolean;

    public _data: T[] = [];
    public dataSource: MatTableDataSource<T> = new MatTableDataSource(this._data);
    public subscribers: AssignableObject<Subscription> = {};

    public selection: SelectionModel<T>;


    private readonly MAXIMUM_COLS_MOBILE: number = 4;
    //private readonly MINIMUM_COLS: number = 1;


    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    constructor(private resizeService: ResizeService){

        this.selection = new SelectionModel<T>(true, []);

        this.subscribers.resizeService = this.resizeService.getIsMobile().subscribe(data => {
            this.isMobile = data;
            this.showColumns = !this.isMobile;

            if(this.isMobile){
                let columns = this.columns.slice(0);
                columns.length > this.MAXIMUM_COLS_MOBILE && (columns.length = 4);
                this.columns = columns;
            }
        });

    }

    @Input()
    public set data(data: T[]) {

        this._data = data;
        this.dataSource = new MatTableDataSource(this._data);
        this.dataSource.sort = this.sort;

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    public handleSelectedDeleteClick(event: MouseEvent) {

        event.stopPropagation();
        this.onDeleteClick.emit(this.selection.selected.slice(0));
        this.selection.clear();
    }

    public getAllColumns() {
        return ['select'].concat(this.columns, 'delete');
    }

    public handleColumnVisibilityChange(column: string): void {

        let columns = this.columns.slice(0);
        let colIndex = columns.indexOf(column);


        if (colIndex >= 0) {
            columns.splice(colIndex, 1);
        } else {

            if (columns.length > this.MAXIMUM_COLS_MOBILE - 1 && this.isMobile) {
                columns.length--;
            }

            let keys = Object.keys(this._data[0]);
            columns.push(column);
            // This sorts the column names to match the order of the object keys
            columns.sort((a, b) => keys.indexOf(a) - keys.indexOf(b));
        }

        this.columns = columns;

    }

    public handleDeleteClick(event: MouseEvent, data: T) {

        event.stopPropagation();
        this.onDeleteClick.emit([data]);
    }

    public handleItemClick(data: T): void {
        this.onItemClick.emit(data);
    }

    public handleShowDisplayColumnsClick(){
        this.showColumns = !this.showColumns;
    }

}
