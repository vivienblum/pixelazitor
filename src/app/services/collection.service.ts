import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Collection } from '../models/collection';

@Injectable({
    providedIn: 'root',
})
export class CollectionService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    public getCollections(available: boolean = null): Observable<Collection[]> {
        return this.http.get<Collection[]>(
            `${this.baseUrl}/api/collections/?available=${available}`
        );
    }

    public delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/api/collections/${id}/`);
    }

    public update(collection: Collection): Observable<any> {
        return this.http.put<Collection>(
            `${this.baseUrl}/api/collections/${collection.id}/`,
            collection
        );
    }

    public add(collection: any): Observable<Collection> {
        return this.http.post<Collection>(
            `${this.baseUrl}/api/collections/`,
            collection
        );
    }

    public get(id: number): Observable<Collection> {
        return this.http.get<Collection>(
            `${this.baseUrl}/api/collections/${id}/`
        );
    }
}
