
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AssignableObject} from '../models/AssignableObject';
import {DisplayConfig, Entity, EntityInfo} from '../models/entities';
import {UsersSchema, InstallationsSchema, ValidationSchema} from '../models/validators/schemas';

@Injectable()
export class EntityService {

    private entitiesMapping: AssignableObject<EntityInfo>;

    constructor(private http: HttpClient) {

        this.entitiesMapping = {
            user: {
                routes: {
                    get: '/user',
                    create: '/users',
                    update: '/users',
                    delete: '/user/delete/',
                },
                schema: UsersSchema,
                displayConfig: {
                    flex: [1,2,3,1,4,5,2,3],
                    order: []
                }
            },
            installation: {
                routes: {
                    get: '/installations',
                    create: '/installationscrud',
                    update: '/installationscrud',
                    delete: '/installationscrud',
                },
                schema: InstallationsSchema
            }
        };

    }

    public getEntity<T>(entityName: string): Observable<T[]> {
        let route = this.entitiesMapping[entityName].routes.get;
        return this.http.get<T[]>(`http://localhost:3000${route}`+"/getAll", {withCredentials: true});
    }

    public getManyEntity<T>(entityName: string, field: string, value: string): Observable<T[]> {
        let route = this.entitiesMapping[entityName].routes.get;
        return this.http.get<T[]>(`http://localhost:3000${route}`+"/getMany/"+field+"/"+value, {withCredentials: true});
    }

    public deleteEntities<T extends Entity>(entityName: string, entities: T[]): Observable<any> {
        let route = this.entitiesMapping[entityName].routes.delete;

        return this.http.delete<T[]>(`http://localhost:3000${route}${entities.map(e => e.id)}`, {withCredentials: true});
    }

    public createEntity<T> (entityName: string, entity: T) {
        let route = this.entitiesMapping[entityName].routes.create;

        return this.http.post<T[]>(`http://localhost:3000${route}`, {withCredentials: true});
    }

    public updateEntity<T>(entityName: string, entity: T): Observable<any> {
        let route = this.entitiesMapping[entityName].routes.update;

        return this.http.put<T[]>(`http://localhost:3000${route}`, entity, {withCredentials: true});
    }

    public getEntitySchema(entityName: string): ValidationSchema {
        return this.entitiesMapping[entityName].schema;
    }

    public getEntityDisplayConfig(entityName: string): DisplayConfig | undefined {
        return this.entitiesMapping[entityName].displayConfig;
    }



}
