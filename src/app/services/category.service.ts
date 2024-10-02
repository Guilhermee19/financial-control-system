import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
import { IPagedReq } from '../models/utils';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpService) {}

  getAllCategories(): Observable<IPagedReq<ICategory>> {
    const query = new HttpParams();
    return this.http.get<IPagedReq<ICategory>>('core/all-categories/', query);
  }

  postCategory(body: BodyJson): Observable<ICategory> {
    return this.http.post<ICategory>(`core/create-category/`, body);
  }

  patchCategory(id: number, body: BodyJson): Observable<ICategory> {
    return this.http.patch<ICategory>(`core/edit-category/${id}/`, body);
  }

  deletCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`core/delete-category/${id}/`);
  }
}


