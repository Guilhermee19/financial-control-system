import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IPagedReq } from '../models/utils';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { IAccount } from '../models/accounts';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpService) {}

  getAllAccounts(page: number, getAll = false): Observable<IAccount[]> {
    const query = new HttpParams().set('page', page).set('all', getAll);

    return this.http.get<IAccount[]>('core/all-accounts/', query);
  }

  getAccounts(page: number): Observable<IPagedReq<IAccount>> {
    const query = new HttpParams().set('page', page);

    return this.http.get<IPagedReq<IAccount>>('core/all-accounts/', query);
  }
}
