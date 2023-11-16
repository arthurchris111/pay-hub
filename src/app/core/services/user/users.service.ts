import { Injectable } from '@angular/core';
import { ProfileUser } from '../../../modal/user';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // bitnob API URL
  profileUserRef: AngularFirestoreCollection<ProfileUser>;
  private path = 'Users';
  private apiUrl = '';

  constructor(private db: AngularFirestore) {
    this.profileUserRef = db.collection(this.path);
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
