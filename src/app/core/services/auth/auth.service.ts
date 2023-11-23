import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Observable, catchError, from, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileUser } from 'src/app/modal/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private createCard_endpoint = 'https://sandboxapi.bitnob.co/api/v1/virtualcards/create';

  constructor(private auth: Auth, private http: HttpClient) {}

  // createCard(ProfileUser: any): Observable<any> {
  //   return this.http.post<any>(this.createCard_endpoint, ProfileUser);
  // }

  public login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(catchError((err: any) => throwError(() => err)));
  }

  public signup(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(catchError((err: any) => throwError(() => err)));
  }

  public logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
