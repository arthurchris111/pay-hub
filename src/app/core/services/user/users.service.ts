import { Injectable } from '@angular/core';
import { ProfileUser } from '../../../modal/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  profileUserRef: AngularFirestoreCollection<ProfileUser>;
  private path = 'Users';
  private apiUrl = 'https://staging-api.flowertop.xyz/api/v1/virtualcards/create';

  // https://staging-api.flowertop.xyz/dashboard/v1/compliance/progress/

  constructor(private db: AngularFirestore, private http: HttpClient) {
    this.profileUserRef = db.collection(this.path);
  }

  createCard(user: ProfileUser): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  get(): any {
    return this.db.collection(this.path).snapshotChanges();
  }

  create(user: ProfileUser): any {
    console.log(user);
    return this.db.collection(this.path).add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.profileUserRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.profileUserRef.doc(id).delete();
  }
}
