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
}
