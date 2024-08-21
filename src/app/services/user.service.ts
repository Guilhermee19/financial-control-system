import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService, private storage: StorageService) {}

  getMe(): Observable<any> {
    // console.log(this.storage.token);
    return this.http.get<any>('core/get-user/');
  }
}
