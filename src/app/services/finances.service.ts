import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
import { Observable } from 'rxjs';
import { IFinance } from '../models/finance';

@Injectable({
  providedIn: 'root',
})
export class FinancesService {
  constructor(private http: HttpService) {}

  getAllFinances(): Observable<IFinance[]> {
    return this.http.get<IFinance[]>('finances');
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
