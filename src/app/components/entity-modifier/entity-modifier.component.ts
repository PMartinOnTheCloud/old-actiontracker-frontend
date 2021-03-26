
import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs';

import {LoginService} from '../login';
import {EntityService} from '../../services/EntityService';
import {ChangeDataDialogComponent} from '../change-data-dialog/change-data-dialog.component';
import {DestroySubscribers, isEmptyObject} from '../../utils';
import {AssignableObject} from '../../models/AssignableObject';
import {ThemeService} from '../../services/ThemeService';
import {Entity} from '../../models/entities';
import {ConfirmDialogComponent} from '../message-dialog/message-dialog.component';
import { callbackify } from 'util';


// TODO: add displayColumnNames and sortable columnNames array and get it from the router data
// check the hardcoded values on entity-modifier.component.html to understand it better.
export interface EntityModifierProps<T> {
    entityName: string;
    sortFunction: (a: T, b: T) => number;
}

@Component({
    selector: 'app-entity-modifier',
    templateUrl: './entity-modifier.component.html',
    styleUrls: ['./entity-modifier.scss']
})
@DestroySubscribers()
export class EntityModifierComponent<T extends Entity> implements OnInit {

    public entities: T[] = [];
    public user: any;
    public value: string;
    public field: string;
    private props: EntityModifierProps<T>;
    private darkTheme: boolean;
    public subscribers: AssignableObject<Subscription> = {};

    public constructor(private route: ActivatedRoute,
                       private loginService: LoginService,
                       private entityService: EntityService,
                       private dialog: MatDialog,
                       private themeService: ThemeService) {}

    public ngOnInit() {

        Promise.all([
            this.loginService.checkIfLoggedIn(),
            //TODO: abstract this to some Generic method like ObservableToPromise<T>(observable: Observable)
            new Promise(resolve => this.route.data.subscribe(d => resolve(d)))
        ]).then(([, data]) => {
            this.props = data as EntityModifierProps<T>;
            this.getEntities(this.props.entityName);
        }).catch(() => {
            this.loginService.toLogin();
        });

        this.subscribers.themeService = this.themeService.isDarkTheme().subscribe(darkTheme => {
            this.darkTheme = darkTheme;
        });

    }

    private async getEntities(entity: string) {
        if(entity=='user'){
            this.loginService.getUser<T>().subscribe(
                user => {
                    this.user = user;
                    this.getManyEntities("user","group",this.user['group']['id']);
                }
            )
        } else {
            this.entityService.getEntity<T>(entity).subscribe(
                entities => {
                    if(this.props.sortFunction) {
                        entities.sort(this.props.sortFunction);
                    }
                    this.entities = entities;
                },
                error => {
                    console.log(error);
                }
            );
        }  
    }

    public createEntity(): void {
        let entity: T = {} as T;
        this.openDialog(entity);
    }

    public getManyEntities(entity, field, value): void {
        this.entityService.getManyEntity<T>(entity, field, value).subscribe(
            entities => {
                if(this.props.sortFunction) {
                    entities.sort(this.props.sortFunction);
                }
                this.entities = entities;
            },
            error => {
                console.log(error);
            }
        );
    }

    public getUserInfo(): void {
        this.loginService.getUser<T>().subscribe(
            user =>{
                this.user = user;
            }
        )
    }

    public openDialog(entity: T): void {

        let config: MatDialogConfig = {
            //height: '800px',
            width: '600px',
            disableClose: true,
            data: {
                item: entity,
                schema: this.entityService.getEntitySchema(this.props.entityName),
                displayConfig: this.entityService.getEntityDisplayConfig(this.props.entityName),
                titleKey: 'name', // TODO: add this to EntityModifierProps
                create: isEmptyObject(entity)
            }
        };

        if(this.darkTheme) {
            config.panelClass = 'dark-theme';
        }

        let dialogRef = this.dialog.open(ChangeDataDialogComponent, config);

        dialogRef.afterClosed().subscribe(result => {

            if (result) {

                let entities = this.entities.slice(0);
                let modified = entities.findIndex(e => e.id === result.entity.id);

                switch (result.function) {
                    case 'delete':
                        this.deleteEntities([result.entity]);
                        break;
                    case 'create':
                        this.entityService.createEntity(this.props.entityName, result.entity).subscribe(
                            data => {
                                console.log(data);
                            }
                        );
                        break;
                    case 'save':
                        this.entityService.updateEntity(this.props.entityName, result.entity).subscribe(
                            data => {
                                entities[modified] = data;
                                this.entities = entities;
                            }
                        );
                        break;
                }
            }

        });
    }

    public deleteEntities(entities: T[]) {

        let observable = this.openConfirmDialog();

        let subscription = observable.subscribe((result) => {

            result && this.entityService.deleteEntities(this.props.entityName, entities).subscribe(
                data => {
                    alert(data);
                    this.getEntities(this.props.entityName);
                }
            );

            subscription.unsubscribe();
        });

    }

    public openConfirmDialog(): Observable<boolean> {

        let config: MatDialogConfig = {
            //height: '800px',
            width: '400px',
            disableClose: true,
            data: {
                title: 'Confirm dialog',
                message: 'Are you sure you want to delete this entity?',
                cancelText: 'Cancel',
                confirmText: 'Delete'
            }
        };

        let dialogRef = this.dialog.open(ConfirmDialogComponent, config);

        return dialogRef.afterClosed();
    }

}
