/* eslint-disable camelcase */
import { Injectable, inject, signal } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Auth, signOut, user } from '@angular/fire/auth';
import { IToken, IUser } from '../models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Md5 } from 'md5-typescript';
import { HttpService } from './http.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService, private router: Router) {}

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<IUser | null | undefined>(undefined);

  login(login: any) {
    const body = new HttpParams()
      .set(`username`, login.email)
      .set(`password`, Md5.init(login.password).toUpperCase());

    return this.http.post<IToken>('core/auth/', body);
  }

  // const photo_profile = token.additionalUserInfo.profile.picture.replace(
  //   '=s96',
  //   '=s900'
  // );
  // const body = {
  //   social_network,
  //   profile_image: photo_profile,
  //   access_token: token.credential.accessToken,
  //   token: token.credential.idToken,
  // };

  loginGoogle(token: any, social_network: string): Observable<any> {
    const photo_profile = token.user.photoURL.replace('=s96', '=s900');
    const body = {
      social_network,
      profile_image: photo_profile,
      access_token: token.user.accessToken,
      token: token.user.accessToken,
    };

    return this.http.post<any>('core/social-network/', body);
  }

  logout() {
    const promise = signOut(this.firebaseAuth);
    this.router.navigate(['/login']);
    return from(promise);
  }
}
