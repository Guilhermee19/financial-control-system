import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
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

  postTag(body: BodyJson): Observable<ITag> {
    return this.http.post<ITag>(`core/create-tag/`, body);
  }

  patchTag(id: number, body: BodyJson): Observable<ITag> {
    return this.http.patch<ITag>(`core/edit-tag/${id}/`, body);
  }

  deletTag(id: number): Observable<ITag> {
    return this.http.delete<ITag>(`core/delete-tag/${id}/`);
  }
}


