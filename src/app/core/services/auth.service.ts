import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
} from '@angular/fire/auth';
import { Observable, catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  public login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((err: any) => throwError(() => err))
    );
  }

  public signup(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(catchError((err: any) => throwError(() => err)));
  }
}
