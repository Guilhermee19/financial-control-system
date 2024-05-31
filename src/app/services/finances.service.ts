import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
import { Observable } from 'rxjs';
import { IFinance } from '../models/finance';
import { HttpParams } from '@angular/common/http';

interface IFilter {
  _sort: string;
  _order: string;
}

@Injectable({
  providedIn: 'root',
})
export class FinancesService {
  constructor(private http: HttpService) {}

  getAllFinances(params: IFilter): Observable<IFinance[]> {
    let query = new HttpParams();

    if (params._sort) query = query.set('_sort', params._sort);
    if (params._order) query = query.set('_order', params._order);

    return this.http.get<IFinance[]>('finances', query);
  }

  postFinance(body: BodyJson): Observable<IFinance> {
    return this.http.post<IFinance>(`finances`, body);
  }

  patchFinance(id: number, body: BodyJson): Observable<IFinance> {
    return this.http.patch<IFinance>(`finances/${id}`, body);
  }

  deletFinance(id: number): Observable<IFinance> {
    return this.http.delete<IFinance>(`finances/${id}`);
  }
}
