import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ICard } from '../models/card';
import { HttpParams } from '@angular/common/http';
import { IPagedReq } from '../models/utils';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpService) {}

  getAllCard(page: number, getAll = false): Observable<IPagedReq<ICard>> {
    const query = new HttpParams().set('page', page).set('all', getAll);

    return this.http.get<IPagedReq<ICard>>('core/all-card/', query);
  }
}
