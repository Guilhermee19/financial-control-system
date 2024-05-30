import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FinancesService {
  constructor(private http: HttpService) {}

  getAllEmployees(): Observable<IUser> {
    return this.http.get<IUser>('finances');
  }

  postEmployee(body: BodyJson): Observable<IUser> {
    return this.http.post<IUser>(`finances`, body);
  }

  patchEmployee(id: number, body: BodyJson): Observable<IUser> {
    return this.http.patch<IUser>(`finances/${id}`, body);
  }

  deletEmployee(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`finances/${id}`);
  }
}
