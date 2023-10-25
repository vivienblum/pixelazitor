import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    public getItems(idCollection: number): Observable<Item[]> {
        return this.http.get<Item[]>(
            `${this.baseUrl}/api/collections/${idCollection}/items/`
        );
    }

    public delete(idCollection: number, id: number): Observable<any> {
        return this.http.delete<any>(
            `${this.baseUrl}/api/collections/${idCollection}/items/${id}/`
        );
    }

    public update(idCollection: number, item: Item): Observable<Item> {
        return this.http.put<Item>(
            `${this.baseUrl}/api/collections/${idCollection}/items/${item.id}/`,
            item
        );
    }

    public add(idCollection: number, item: any): Observable<Item> {
        item.collection = idCollection;

        return this.http.post<Item>(
            `${this.baseUrl}/api/collections/${idCollection}/items/`,
            item
        );
    }

    public get(idCollection: number, id: number): Observable<Item> {
        return this.http.get<Item>(
            `${this.baseUrl}/api/collections/${idCollection}/items/${id}/`
        );
    }
}
