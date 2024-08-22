import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
import { Observable } from 'rxjs';
import { IFinance } from '../models/finance';
import { HttpParams } from '@angular/common/http';
import { IPagedReq } from '../models/utils';

interface IFilter {
  year: number;
  month: number;
}

@Injectable({
  providedIn: 'root',
})
export class FinancesService {
  constructor(private http: HttpService) {}

  getAllFinances(params: IFilter): Observable<IPagedReq<IFinance>> {
    let query = new HttpParams();
    if (params.year && params.month) {
      const startDate = new Date(params.year, params.month - 1, 1); // mês começa em 0, por isso `month - 1`
      const endDate = new Date(params.year, params.month, 0); // passando 0 como dia retorna o último dia do mês anterior

      query = query.set('start_date', startDate.toISOString().split('T')[0]);
      query = query.set('end_date', endDate.toISOString().split('T')[0]);
    }

    return this.http.get<IPagedReq<IFinance>>('core/all-finances/', query);
  }

  postFinance(body: BodyJson): Observable<IFinance> {
    return this.http.post<IFinance>(`core/create-finance/`, body);
  }

  patchFinance(id: number, body: BodyJson): Observable<IFinance> {
    return this.http.patch<IFinance>(`core/edit-finance/${id}/`, body);
  }

  deletFinance(id: number): Observable<IFinance> {
    return this.http.delete<IFinance>(`core/delete-finance/${id}/`);
  }
}
