import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IPagedReq } from '../models/utils';
import { ITag } from '../models/tag';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpService) {}

  getAlltags(): Observable<IPagedReq<ITag>> {
    const query = new HttpParams();
    return this.http.get<IPagedReq<ITag>>('core/all-tags/', query);
  }
}
