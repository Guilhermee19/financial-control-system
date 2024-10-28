import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/finance';
import { HttpParams } from '@angular/common/http';
import { IFilter, IPagedReq } from '../models/utils';

@Injectable({
  providedIn: 'root',
})
export class FinancesService {
  constructor(private http: HttpService) {}

  getAllFinances(params: IFilter): Observable<IPagedReq<ITransaction>> {
    let query = new HttpParams()
    if (params.year && params.month) {
      const startDate = new Date(params.year, params.month - 1, 1); // mês começa em 0, por isso `month - 1`
      const endDate = new Date(params.year, params.month, 0); // passando 0 como dia retorna o último dia do mês anterior

      query = query.set('start_date', startDate.toISOString().split('T')[0]);
      query = query.set('end_date', endDate.toISOString().split('T')[0]);
    }

    if (params.page) {
      query = query.set('page', params.page);
    }

    if (params.return_all) {
      query = query.set('return_all', params.return_all);
    }
    else{
      query = query.set('page_size', 12);
    }

    return this.http.get<IPagedReq<ITransaction>>('core/all-transaction/', query);
  }

  postFinance(body: BodyJson): Observable<ITransaction> {
    return this.http.post<ITransaction>(`core/create-transaction/`, body);
  }

  patchFinance(id: number, body: BodyJson): Observable<ITransaction> {
    return this.http.patch<ITransaction>(`core/edit-transaction/${id}/`, body);
  }

  payInstallment(body: BodyJson): Observable<ITransaction> {
    return this.http.patch<ITransaction>(`core/pay-installment/`, body);
  }

  uploadInstallmentImage(body: BodyJson): Observable<ITransaction> {
    return this.http.patch<ITransaction>(`core/upload-installment-image/`, body);
  }

  deletFinance(id: number): Observable<ITransaction> {
    return this.http.delete<ITransaction>(`core/delete-transaction/${id}/`);
  }
}
